"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthProxy = createAuthProxy;
const http_proxy_middleware_1 = require("http-proxy-middleware");
function createAuthProxy(configService) {
    const target = configService.get("AUTH_SERVICE_URL");
    if (!target) {
        throw new Error("AUTH_SERVICE_URL is not defined");
    }
    return (0, http_proxy_middleware_1.createProxyMiddleware)({
        target,
        changeOrigin: true,
        pathRewrite: {
            "^/auth": "",
        },
    });
}
//# sourceMappingURL=auth.proxy.js.map