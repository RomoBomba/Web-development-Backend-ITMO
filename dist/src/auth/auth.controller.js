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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = __importDefault(require("express"));
const emailpassword_1 = __importDefault(require("supertokens-node/recipe/emailpassword"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const public_decorator_1 = require("../common/decorators/public.decorator");
const auth_service_1 = require("./auth.service");
const supertokens_node_1 = require("supertokens-node");
let AuthController = AuthController_1 = class AuthController {
    authService;
    logger = new common_1.Logger(AuthController_1.name);
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(body, res) {
        this.logger.log(`Signup request: ${body.email}`);
        const tenantId = 'public';
        const { email, password } = body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        try {
            const response = await emailpassword_1.default.signUp(tenantId, email, password, undefined, {
                formFields: [
                    { id: 'email', value: email },
                    { id: 'password', value: password },
                ],
            });
            if (response.status === 'OK') {
                await this.authService.findOrCreateUserFromSupertokens(response.user.id, email);
                return res.status(200).json({
                    message: 'Регистрация успешна',
                    userId: response.user.id,
                });
            }
            if (response.status === 'EMAIL_ALREADY_EXISTS_ERROR') {
                return res.status(400).json({ message: 'Пользователь уже существует' });
            }
            return res.status(400).json({ message: 'Ошибка регистрации' });
        }
        catch (error) {
            this.logger.error(`Signup error: ${error.message}`);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async signIn(body, req, res) {
        const tenantId = 'public';
        const { email, password } = body;
        try {
            console.log('🔐 Signin attempt:', email);
            const response = await emailpassword_1.default.signIn(tenantId, email, password, undefined, {
                formFields: [
                    { id: 'email', value: email },
                    { id: 'password', value: password },
                ],
            });
            console.log('📡 Signin response status:', response.status);
            if (response.status === 'OK') {
                const user = await this.authService.getUserBySupertokensId(response.user.id);
                const recipeUserId = new supertokens_node_1.RecipeUserId(response.user.id);
                console.log('👤 User found, creating session...');
                console.log('👤 User role from DB:', user?.role);
                const session = await session_1.default.createNewSession(req, res, tenantId, recipeUserId, {
                    userPayload: {
                        role: user?.role || 'user',
                        email: user?.email,
                        name: user?.name
                    }
                });
                console.log('✅ Session created, handle:', session.getHandle());
                const accessToken = session.getAccessToken();
                console.log('🍪 Access token:', accessToken.substring(0, 50) + '...');
                res.cookie('sAccessToken', accessToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 24 * 60 * 60 * 1000
                });
                const cookieHeaders = res.getHeader('Set-Cookie');
                console.log('🍪 Set-Cookie headers after manual set:', cookieHeaders);
                console.log('🔄 Returning JSON redirect to /');
                return res.status(200).json({
                    message: 'Вход выполнен успешно',
                    redirect: '/'
                });
            }
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }
        catch (error) {
            console.error('❌ Signin error:', error);
            this.logger.error(`Signin error: ${error.message}`);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async signOut(req, res) {
        try {
            const session = await session_1.default.getSession(req, res, { sessionRequired: false });
            if (session) {
                await session_1.default.revokeSession(session.getHandle());
            }
        }
        catch (error) {
        }
        res.setHeader('Set-Cookie', [
            'sAccessToken=; HttpOnly; Path=/; Max-Age=0',
            'sRefreshToken=; HttpOnly; Path=/; Max-Age=0'
        ]);
        return res.redirect(302, '/');
    }
    async checkSession(req, res) {
        console.log('🔍 /auth/check called');
        console.log('🍪 Cookies in request:', req.headers.cookie);
        try {
            const session = await session_1.default.getSession(req, res, { sessionRequired: false });
            if (session) {
                const payload = session.getAccessTokenPayload();
                const user = await this.authService.getUserBySupertokensId(session.getUserId());
                const role = payload?.userPayload?.role || payload?.role || 'user';
                console.log('✅ Session found, userId:', session.getUserId(), 'role:', role);
                return res.status(200).json({
                    exists: true,
                    userId: session.getUserId(),
                    role: role,
                    email: user?.email,
                    name: user?.name,
                });
            }
        }
        catch (error) {
            console.log('❌ Session check failed:', error.message);
        }
        return res.status(200).json({ exists: false });
    }
    async getSession(req, res) {
        try {
            const session = await session_1.default.getSession(req, res);
            if (session) {
                const payload = session.getAccessTokenPayload();
                const user = await this.authService.getUserBySupertokensId(session.getUserId());
                return res.status(200).json({
                    userId: session.getUserId(),
                    email: user?.email,
                    name: user?.name,
                    role: payload.role || 'user',
                });
            }
        }
        catch (error) {
        }
        return res.status(401).json({ message: 'No active session' });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('signout'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, common_1.Get)('check'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkSession", null);
__decorate([
    (0, common_1.Get)('session'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getSession", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map