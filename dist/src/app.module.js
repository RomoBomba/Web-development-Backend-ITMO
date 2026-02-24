"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const pg_connection_string_1 = require("pg-connection-string");
const pages_controller_1 = require("./pages/pages.controller");
const user_entity_1 = require("./entities/user.entity");
const category_entity_1 = require("./entities/category.entity");
const product_entity_1 = require("./entities/product.entity");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const review_entity_1 = require("./entities/review.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => {
                    const connectionString = process.env.DATABASE_URL;
                    if (!connectionString) {
                        throw new Error('DATABASE_URL environment variable is not defined');
                    }
                    const config = (0, pg_connection_string_1.parse)(connectionString);
                    return {
                        type: 'postgres',
                        host: config.host || undefined,
                        port: config.port ? parseInt(config.port, 10) : 5432,
                        username: config.user || undefined,
                        password: config.password || undefined,
                        database: config.database || undefined,
                        entities: [user_entity_1.User, category_entity_1.Category, product_entity_1.Product, order_entity_1.Order, order_item_entity_1.OrderItem, review_entity_1.Review],
                        synchronize: false,
                        logging: true,
                        ssl: {
                            rejectUnauthorized: false,
                        },
                    };
                },
            }),
        ],
        controllers: [pages_controller_1.PagesController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map