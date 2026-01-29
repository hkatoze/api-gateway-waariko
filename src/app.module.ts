import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { createAuthProxy } from "./proxy/auth.proxy";
import { createBillingProxy } from "./proxy/billing.proxy";


import { RequestLoggerMiddleware } from "./middleware/request-logger.middleware";
import { JwtAuthMiddleware } from "./middleware/jwt-auth.middleware";
import { CompanyRequiredMiddleware } from "./middleware/company-required.middleware";
import { createCompaniesProxy } from "./proxy/companies.proxy";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET_KEY"),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthMiddleware],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    // Logger + JWT
    consumer.apply(RequestLoggerMiddleware, JwtAuthMiddleware).forRoutes("*");

    // Company required
    consumer
    .apply(CompanyRequiredMiddleware)
    .forRoutes('*');


    // AUTH proxy
  consumer.apply(createAuthProxy(this.configService)).forRoutes("/auth");


     // COMPANIES proxy 
  consumer
    .apply(createCompaniesProxy(this.configService))
    .forRoutes('/companies');

    // BILLING proxy
    consumer
      .apply(createBillingProxy(this.configService))
      .forRoutes("/billing");
  }
}

