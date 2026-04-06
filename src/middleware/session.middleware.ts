import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import Session from 'supertokens-node/recipe/session';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const session = await Session.getSession(req, res, {sessionRequired: false});
            if (session) {
                const payload = session.getAccessTokenPayload();
                (req as any).user = {
                    id: session.getUserId(),
                    role: payload?.role || 'user',
                    isAuthenticated: true
                };
            } else {
                (req as any).user = {isAuthenticated: false};
            }
        } catch (error) {
            console.log('⚠️ Session middleware error:', error.message);
            (req as any).user = {isAuthenticated: false};
        }
        next();
    }
}