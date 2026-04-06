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
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const supertokens_nestjs_1 = require("supertokens-nestjs");
const emailpassword_1 = __importDefault(require("supertokens-node/recipe/emailpassword"));
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const users_module_1 = require("../users/users.module");
let AuthModule = AuthModule_1 = class AuthModule {
    static forRoot() {
        const connectionURI = process.env.SUPERTOKENS_CONNECTION_URI;
        const apiKey = process.env.SUPERTOKENS_API_KEY;
        if (!connectionURI) {
            throw new Error('SUPERTOKENS_CONNECTION_URI is not defined');
        }
        if (!apiKey) {
            throw new Error('SUPERTOKENS_API_KEY is not defined');
        }
        const appInfo = {
            appName: process.env.SUPERTOKENS_APP_NAME ?? 'MusicStore',
            apiDomain: process.env.SUPERTOKENS_API_DOMAIN ?? 'http://localhost:3000',
            websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN ?? 'http://localhost:3000',
        };
        return {
            module: AuthModule_1,
            imports: [
                supertokens_nestjs_1.SuperTokensModule.forRoot({
                    framework: 'express',
                    supertokens: {
                        connectionURI,
                        apiKey,
                    },
                    appInfo,
                    recipeList: [
                        emailpassword_1.default.init({
                            override: {
                                apis: (originalImplementation) => {
                                    return {
                                        ...originalImplementation,
                                        signUpPOST: undefined,
                                        signInPOST: undefined,
                                    };
                                },
                            },
                        }),
                        session_1.default.init({
                            cookieSameSite: 'lax',
                            cookieSecure: false,
                            sessionExpiredStatusCode: 401,
                        }),
                    ],
                }),
                users_module_1.UsersModule,
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService],
            exports: [auth_service_1.AuthService],
        };
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({})
], AuthModule);
//# sourceMappingURL=auth.module.js.map