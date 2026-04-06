import express from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    signUp(body: {
        email: string;
        password: string;
    }, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    signIn(body: {
        email: string;
        password: string;
    }, req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    signOut(req: express.Request, res: express.Response): Promise<void>;
    checkSession(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    getSession(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
