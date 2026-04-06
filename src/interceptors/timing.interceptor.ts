import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const start = Date.now();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        return next.handle().pipe(
            tap(() => {
                if (response.headersSent) return;

                const elapsed = Date.now() - start;
                const isGraphQL = request.url?.includes('/graphql');

                console.log(`[${request.method}] ${request.url} - ${elapsed}ms`);

                if (!isGraphQL) {
                    response.setHeader('X-Elapsed-Time', `${elapsed}ms`);
                }
            }),
            map((data) => {
                const elapsed = Date.now() - start;
                if (response.headersSent) return data;

                if (data && typeof data === 'object' && !data?.loadTime) {
                    return { ...data, loadTime: elapsed };
                }
                return data;
            }),
        );
    }
}