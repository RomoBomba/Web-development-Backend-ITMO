import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        if (request?.url?.includes('/graphql')) {
            this.logger.error(`GraphQL Error: ${exception instanceof Error ? exception.message : exception}`);
            throw exception;
        }

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Внутренняя ошибка сервера';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            message = typeof errorResponse === 'string'
                ? errorResponse
                : (errorResponse as any).message || exception.message;
        } else if (exception instanceof QueryFailedError) {
            if ((exception as any).code === '23505') {
                status = HttpStatus.CONFLICT;
                message = 'Запись с такими данными уже существует';
            } else {
                message = 'Ошибка базы данных';
            }
        }

        this.logger.error(`${request?.method || 'UNKNOWN'} ${request?.url || 'unknown'}`);

        const acceptsJson = request?.headers?.accept?.includes('application/json');

        if (acceptsJson || request?.url?.startsWith('/api/')) {
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request?.url || 'unknown',
                message: Array.isArray(message) ? message[0] : message,
            });
        } else {
            try {
                response.status(status).render('pages/error', {
                    statusCode: status,
                    message,
                    title: `Ошибка ${status}`,
                    currentPage: 'error',
                    isAuthenticated: false,
                });
            } catch (renderError) {
                response.status(status).send(`
          <!DOCTYPE html>
          <html>
          <head><title>Ошибка ${status}</title></head>
          <body>
            <h1>Ошибка ${status}</h1>
            <p>${message}</p>
            <a href="/">Вернуться на главную</a>
          </body>
          </html>
        `);
            }
        }
    }
}