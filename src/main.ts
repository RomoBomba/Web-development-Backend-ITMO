import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';
import {ValidationPipe} from '@nestjs/common';
import methodOverride from 'method-override';
import {AllExceptionsFilter} from "./filters/http-exception.filter";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {TimingInterceptor} from "./interceptors/timing.interceptor";
import {EtagInterceptor} from "./interceptors/etag.interceptor";
import {SuperTokensExceptionFilter} from 'supertokens-nestjs';
import supertokens from 'supertokens-node';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const websiteDomain = process.env.SUPERTOKENS_WEBSITE_DOMAIN || 'http://localhost:3000';

    app.enableCors({
        origin: [websiteDomain, 'http://127.0.0.1:3000'],
        allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
        exposedHeaders: ['st-access-token', 'st-refresh-token', 'st-id-token', 'set-cookie'],
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    });

    app.useGlobalFilters(new SuperTokensExceptionFilter());

    app.useStaticAssets(join(process.cwd(), 'public'));
    app.setBaseViewsDir(join(process.cwd(), 'views'));
    app.setViewEngine('ejs');
    app.use(methodOverride('_method'));
    app.useGlobalInterceptors(new TimingInterceptor(), new EtagInterceptor());

    // временно убираем чтобы работал GraphQL
    // app.useGlobalPipes(
    //   new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     transform: true,
    //     transformOptions: {
    //       enableImplicitConversion: true,
    //     },
    //       skipUndefinedProperties: true,
    //       skipNullProperties: true,
    //       skipMissingProperties: true,
    //   }),
    // );

    //app.useGlobalFilters(new AllExceptionsFilter());

    const config = new DocumentBuilder()
        .setTitle('MusicStore API')
        .setDescription('API для интернет-магазина музыкальных инструментов')
        .setVersion('1.0')
        .addTag('products', 'Управление товарами')
        .addTag('categories', 'Управление категориями')
        .addTag('orders', 'Управление заказами')
        .addTag('users', 'Управление пользователями')
        .addTag('reviews', 'Управление отзывами')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();

// админ: email:"admin@example.com","password":"12345678"
// Remove-Item -Recurse -Force dist      npm run build       npm run start:dev