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
exports.SessionMiddleware = void 0;
const common_1 = require("@nestjs/common");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
let SessionMiddleware = class SessionMiddleware {
    async use(req, res, next) {
        try {
            const session = await session_1.default.getSession(req, res, { sessionRequired: false });
            if (session) {
                const payload = session.getAccessTokenPayload();
                req.user = {
                    id: session.getUserId(),
                    role: payload?.role || 'user',
                    isAuthenticated: true
                };
            }
            else {
                req.user = { isAuthenticated: false };
            }
        }
        catch (error) {
            console.log('⚠️ Session middleware error:', error.message);
            req.user = { isAuthenticated: false };
        }
        next();
    }
};
exports.SessionMiddleware = SessionMiddleware;
exports.SessionMiddleware = SessionMiddleware = __decorate([
    (0, common_1.Injectable)()
], SessionMiddleware);
//# sourceMappingURL=session.middleware.js.map