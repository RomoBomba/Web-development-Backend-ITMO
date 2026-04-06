import {Controller, Post, Body, Req, Res, Get, Logger} from '@nestjs/common';
import express from 'express';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import {Public} from '../common/decorators/public.decorator';
import {AuthService} from './auth.service';
import {RecipeUserId} from "supertokens-node";

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {
    }

    @Post('signup')
    @Public()
    async signUp(@Body() body: { email: string; password: string }, @Res() res: express.Response) {
        this.logger.log(`Signup request: ${body.email}`);

        const tenantId = 'public';
        const {email, password} = body;

        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }

        try {
            const response = await EmailPassword.signUp(tenantId, email, password, undefined, {
                formFields: [
                    {id: 'email', value: email},
                    {id: 'password', value: password},
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
                return res.status(400).json({message: 'Пользователь уже существует'});
            }

            return res.status(400).json({message: 'Ошибка регистрации'});
        } catch (error) {
            this.logger.error(`Signup error: ${error.message}`);
            return res.status(500).json({message: 'Ошибка сервера'});
        }
    }

    @Post('signin')
    @Public()
    async signIn(@Body() body: {
        email: string;
        password: string
    }, @Req() req: express.Request, @Res() res: express.Response) {
        const tenantId = 'public';
        const {email, password} = body;

        try {
            console.log('🔐 Signin attempt:', email);

            const response = await EmailPassword.signIn(tenantId, email, password, undefined, {
                formFields: [
                    {id: 'email', value: email},
                    {id: 'password', value: password},
                ],
            });

            console.log('📡 Signin response status:', response.status);

            if (response.status === 'OK') {
                const user = await this.authService.getUserBySupertokensId(response.user.id);
                const recipeUserId = new RecipeUserId(response.user.id);

                console.log('👤 User found, creating session...');
                console.log('👤 User role from DB:', user?.role);

                const session = await Session.createNewSession(req, res, tenantId, recipeUserId, {
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
            return res.status(401).json({message: 'Неверный email или пароль'});
        } catch (error) {
            console.error('❌ Signin error:', error);
            this.logger.error(`Signin error: ${error.message}`);
            return res.status(500).json({message: 'Ошибка сервера'});
        }
    }

    @Post('signout')
    @Public()
    async signOut(@Req() req: express.Request, @Res() res: express.Response) {
        try {
            const session = await Session.getSession(req, res, {sessionRequired: false});
            if (session) {
                await Session.revokeSession(session.getHandle());
            }
        } catch (error) {
        }
        res.setHeader('Set-Cookie', [
            'sAccessToken=; HttpOnly; Path=/; Max-Age=0',
            'sRefreshToken=; HttpOnly; Path=/; Max-Age=0'
        ]);
        return res.redirect(302, '/');
    }

    @Get('check')
    @Public()
    async checkSession(@Req() req: express.Request, @Res() res: express.Response) {
        console.log('🔍 /auth/check called');
        console.log('🍪 Cookies in request:', req.headers.cookie);

        try {
            const session = await Session.getSession(req, res, {sessionRequired: false});
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
        } catch (error) {
            console.log('❌ Session check failed:', error.message);
        }
        return res.status(200).json({exists: false});
    }

    @Get('session')
    async getSession(@Req() req: express.Request, @Res() res: express.Response) {
        try {
            const session = await Session.getSession(req, res);
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
        } catch (error) {
        }
        return res.status(401).json({message: 'No active session'});
    }
}