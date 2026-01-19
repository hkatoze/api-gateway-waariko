"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompaniesProxy = createCompaniesProxy;
const http_proxy_middleware_1 = require("http-proxy-middleware");
function createCompaniesProxy(configService) {
    const target = configService.get("AUTH_SERVICE_URL");
    if (!target) {
        throw new Error("AUTH_SERVICE_URL is not defined");
    }
    return (0, http_proxy_middleware_1.createProxyMiddleware)({
        target,
        changeOrigin: true,
        pathRewrite: {
            "^/companies": "",
        },
    });
}
//# sourceMappingURL=companies.proxy.js.map