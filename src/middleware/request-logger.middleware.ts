import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("API-GATEWAY");

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;

      this.logger.log(
        `${method} ${originalUrl} → ${statusCode} (${duration}ms)`
      );
    });

    next();
  }
}
