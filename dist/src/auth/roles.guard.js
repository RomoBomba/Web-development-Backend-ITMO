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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles)
            return true;
        const http = context.switchToHttp();
        const request = http.getRequest();
        const response = http.getResponse();
        try {
            const session = await session_1.default.getSession(request, response, { sessionRequired: false });
            if (!session) {
                if (request.url.startsWith('/api/')) {
                    response.status(401).json({ message: 'Unauthorized' });
                    return false;
                }
                else {
                    response.redirect('/login');
                    return false;
                }
            }
            const payload = session.getAccessTokenPayload();
            const role = payload?.userPayload?.role || payload?.role;
            console.log('🔐 RolesGuard - checking role:', role, 'required:', requiredRoles);
            if (requiredRoles.includes(role))
                return true;
        }
        catch (e) {
            console.log('🔐 RolesGuard error:', e.message);
        }
        if (request.url.startsWith('/api/')) {
            response.status(401).json({ message: 'Unauthorized' });
            return false;
        }
        else {
            response.redirect('/login');
            return false;
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map