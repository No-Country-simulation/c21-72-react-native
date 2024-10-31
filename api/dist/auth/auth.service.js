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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcryptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const refresh_jwt_config_1 = require("./config/refresh-jwt.config");
let AuthService = class AuthService {
    constructor(userService, jwtService, refreshTokenConfig) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.refreshTokenConfig = refreshTokenConfig;
    }
    async register({ name, email, password }) {
        const user = await this.userService.findByOneEmail(email);
        if (user) {
            throw new common_1.BadRequestException('Usuario ya existe');
        }
        return await this.userService.create({
            name,
            email,
            password: await bcryptjs.hash(password, 15)
        });
    }
    async login({ email, password }) {
        const user = await this.userService.findByOneEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Usuario no encontrado");
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta');
        }
        const payload = { email: user.email, name: user.name };
        const rol = user.rol;
        const { access_token, refresh_token } = await this.generateTokens(payload);
        return { access_token, refresh_token, rol, message: 'Login Successful', user: { name: user.name, email: email } };
    }
    async refreshToken(refreshToken) {
        try {
            const user = this.jwtService.verify(refreshToken, { secret: this.refreshTokenConfig.secret });
            const payload = { email: user.email, name: user.name };
            const { access_token, refresh_token } = await this.generateTokens(payload);
            return {
                access_token,
                refresh_token,
                email: user.email,
                rol: user.rol,
                status: 200,
                user: user.name,
                message: 'Refresh token correctamente'
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Refresh token inválido');
        }
    }
    async generateTokens(user) {
        const jwtPayload = { email: user.email, name: user.name };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload),
            this.jwtService.signAsync(jwtPayload, this.refreshTokenConfig)
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(refresh_jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService, void 0])
], AuthService);
//# sourceMappingURL=auth.service.js.map