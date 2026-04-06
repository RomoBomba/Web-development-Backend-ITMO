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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
let AuthService = AuthService_1 = class AuthService {
    usersService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUserByEmail(email) {
        try {
            return await this.usersService.findByEmail(email);
        }
        catch {
            return null;
        }
    }
    async getUserBySupertokensId(supertokensUserId) {
        try {
            return await this.usersService.findBySupertokensId(supertokensUserId);
        }
        catch {
            return null;
        }
    }
    async findOrCreateUserFromSupertokens(supertokensUserId, email) {
        let user = await this.usersService.findBySupertokensId(supertokensUserId);
        if (!user) {
            const role = email.includes('admin') ? 'admin' : 'user';
            user = await this.usersService.create({
                email,
                name: email.split('@')[0],
                password: '',
                supertokensUserId,
                role,
            });
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map