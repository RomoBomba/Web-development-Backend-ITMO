import { Module, DynamicModule } from '@nestjs/common';
import { SuperTokensModule } from 'supertokens-nestjs';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({})
export class AuthModule {
    static forRoot(): DynamicModule {
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
            module: AuthModule,
            imports: [
                SuperTokensModule.forRoot({
                    framework: 'express',
                    supertokens: {
                        connectionURI,
                        apiKey,
                    },
                    appInfo,
                    recipeList: [
                        EmailPassword.init({
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
                        Session.init({
                            cookieSameSite: 'lax',
                            cookieSecure: false,
                            sessionExpiredStatusCode: 401,
                        }),
                    ],
                }),
                UsersModule,
            ],
            controllers: [AuthController],
            providers: [AuthService],
            exports: [AuthService],
        };
    }
}