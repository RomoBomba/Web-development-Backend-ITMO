"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDebugMiddleware = void 0;
const common_1 = require("@nestjs/common");
let AuthDebugMiddleware = class AuthDebugMiddleware {
    async use(req, res, next) {
        console.log('🔍 AuthDebug - Request URL:', req.url);
        console.log('🔍 AuthDebug - Cookies:', req.headers.cookie);
        const originalSend = res.send;
        res.send = function (body) {
            const setCookie = res.getHeader('Set-Cookie');
            console.log('🔍 AuthDebug - Set-Cookie:', setCookie);
            return originalSend.call(this, body);
        };
        next();
    }
};
exports.AuthDebugMiddleware = AuthDebugMiddleware;
exports.AuthDebugMiddleware = AuthDebugMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthDebugMiddleware);
//# sourceMappingURL=auth-debug.middleware.js.map