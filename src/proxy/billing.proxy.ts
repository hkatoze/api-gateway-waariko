import { createProxyMiddleware } from "http-proxy-middleware";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

export function createBillingProxy(configService: ConfigService) {
  const target = configService.get<string>("BILLING_SERVICE_URL");

  if (!target) {
    throw new Error("BILLING_SERVICE_URL is not defined");
  }

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      "^/billing": "",
    },
  });
}
