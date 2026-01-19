"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBillingProxy = createBillingProxy;
const http_proxy_middleware_1 = require("http-proxy-middleware");
function createBillingProxy(configService) {
    const target = configService.get("BILLING_SERVICE_URL");
    if (!target) {
        throw new Error("BILLING_SERVICE_URL is not defined");
    }
    return (0, http_proxy_middleware_1.createProxyMiddleware)({
        target,
        changeOrigin: true,
        pathRewrite: {
            "^/billing": "",
        },
    });
}
//# sourceMappingURL=billing.proxy.js.map