import { ConfigService } from "@nestjs/config";
export declare function createCompaniesProxy(configService: ConfigService): import("http-proxy-middleware").RequestHandler<import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, (err?: any) => void>;
