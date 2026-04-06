import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        return next.handle().pipe(
            map((data) => {
                if (data && data.fromCache === true) {
                    response.setHeader('X-Cache', 'HIT');
                } else if (data && data.fromCache === false) {
                    response.setHeader('X-Cache', 'MISS');
                }
                return data;
            }),
        );
    }
}