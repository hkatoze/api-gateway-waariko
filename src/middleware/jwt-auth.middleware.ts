import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Routes publiques
    if (
      req.originalUrl.startsWith("/auth") ||
      req.originalUrl.startsWith("/auth/health") ||
      req.originalUrl.startsWith("/auth/login") ||
      req.originalUrl.startsWith("/auth/register") ||
      req.originalUrl.startsWith("/health")
    ) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("Missing token");
    }

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
      throw new UnauthorizedException("Invalid token format");
    }

    try {
      const payload = this.jwtService.verify(token);
      // On injecte l'utilisateur dans la requête
      (req as any).user = payload;
      next();
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
