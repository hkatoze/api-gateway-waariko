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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_proxy_1 = require("./proxy/auth.proxy");
const billing_proxy_1 = require("./proxy/billing.proxy");
const request_logger_middleware_1 = require("./middleware/request-logger.middleware");
const jwt_auth_middleware_1 = require("./middleware/jwt-auth.middleware");
const companies_proxy_1 = require("./proxy/companies.proxy");
let AppModule = class AppModule {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    configure(consumer) {
        consumer.apply(request_logger_middleware_1.RequestLoggerMiddleware, jwt_auth_middleware_1.JwtAuthMiddleware).forRoutes("*");
        consumer.apply((0, auth_proxy_1.createAuthProxy)(this.configService)).forRoutes("/auth");
        consumer
            .apply((0, companies_proxy_1.createCompaniesProxy)(this.configService))
            .forRoutes('/companies');
        consumer
            .apply((0, billing_proxy_1.createBillingProxy)(this.configService))
            .forRoutes("/billing");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get("JWT_SECRET_KEY"),
                }),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_auth_middleware_1.JwtAuthMiddleware],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
//# sourceMappingURL=app.module.js.map