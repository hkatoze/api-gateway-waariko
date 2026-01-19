import { createProxyMiddleware } from "http-proxy-middleware";
import { ConfigService } from "@nestjs/config";

export function createAuthProxy(configService: ConfigService) {
  const target = configService.get<string>("AUTH_SERVICE_URL");

  if (!target) {
    throw new Error("AUTH_SERVICE_URL is not defined");
  }

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "",
    },
  });
}
