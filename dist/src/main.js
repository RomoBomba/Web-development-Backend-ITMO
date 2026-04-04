"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const method_override_1 = __importDefault(require("method-override"));
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    app.use((0, method_override_1.default)('_method'));
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map