"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtAuthMiddleware = class JwtAuthMiddleware {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        if (req.originalUrl.startsWith("/auth") ||
            req.originalUrl.startsWith("/auth/health") ||
            req.originalUrl.startsWith("/auth/login") ||
            req.originalUrl.startsWith("/auth/register") ||
            req.originalUrl.startsWith("/auth/forgot-password") ||
            req.originalUrl.startsWith("/auth/verify-otp") ||
            req.originalUrl.startsWith("/auth/reset-password") ||
            req.originalUrl.startsWith("/health")) {
            return next();
        }
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException("Missing token");
        }
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer" || !token) {
            throw new common_1.UnauthorizedException("Invalid token format");
        }
        try {
            const payload = this.jwtService.verify(token);
            req.user = payload;
            next();
        }
        catch {
            throw new common_1.UnauthorizedException("Invalid token");
        }
    }
};
exports.JwtAuthMiddleware = JwtAuthMiddleware;
exports.JwtAuthMiddleware = JwtAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthMiddleware);
//# sourceMappingURL=jwt-auth.middleware.js.map