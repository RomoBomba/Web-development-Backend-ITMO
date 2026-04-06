import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';

@Injectable()
export class AuthDebugMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        console.log('🔍 AuthDebug - Request URL:', req.url);
        console.log('🔍 AuthDebug - Cookies:', req.headers.cookie);

        const originalSend = res.send;
        res.send = function (body?: any) {
            const setCookie = res.getHeader('Set-Cookie');
            console.log('🔍 AuthDebug - Set-Cookie:', setCookie);
            return originalSend.call(this, body);
        };

        next();
    }
}
