"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRequiredMiddleware = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let CompanyRequiredMiddleware = class CompanyRequiredMiddleware {
    async use(req, res, next) {
        if (req.originalUrl.startsWith("/auth") ||
            req.originalUrl.startsWith("/health") ||
            req.originalUrl.startsWith("/companies")) {
            return next();
        }
        const user = req.user;
        if (!user)
            return next();
        try {
            const response = await axios_1.default.get(`${process.env.AUTH_SERVICE_URL}/companies/exists`, {
                headers: {
                    Authorization: req.headers.authorization,
                },
            });
            if (!response.data.hasCompany) {
                throw new common_1.ForbiddenException("You must create a company before using the application");
            }
            next();
        }
        catch {
            throw new common_1.ForbiddenException("You must create a company before using the application");
        }
    }
};
exports.CompanyRequiredMiddleware = CompanyRequiredMiddleware;
exports.CompanyRequiredMiddleware = CompanyRequiredMiddleware = __decorate([
    (0, common_1.Injectable)()
], CompanyRequiredMiddleware);
//# sourceMappingURL=company-required.middleware.js.map