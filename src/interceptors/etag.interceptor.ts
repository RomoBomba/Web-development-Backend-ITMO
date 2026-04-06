import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class EtagInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const ifNoneMatch = request.headers['if-none-match'];

        return next.handle().pipe(
            map((data) => {
                if (request.method !== 'GET' || !request.url?.startsWith('/api/')) {
                    return data;
                }

                const etag = crypto
                    .createHash('md5')
                    .update(JSON.stringify(data))
                    .digest('hex');

                response.setHeader('ETag', etag);
                response.setHeader('Cache-Control', 'private, max-age=60');

                if (ifNoneMatch === etag) {
                    response.status(304);
                    return null;
                }

                return data;
            }),
        );
    }
}