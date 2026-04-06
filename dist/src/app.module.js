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
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const pg_connection_string_1 = require("pg-connection-string");
const pages_controller_1 = require("./pages/pages.controller");
const user_entity_1 = require("./entities/user.entity");
const category_entity_1 = require("./entities/category.entity");
const product_entity_1 = require("./entities/product.entity");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const review_entity_1 = require("./entities/review.entity");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("./orders/orders.module");
const users_module_1 = require("./users/users.module");
const reviews_module_1 = require("./reviews/reviews.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const storage_module_1 = require("./storage/storage.module");
const auth_module_1 = require("./auth/auth.module");
const session_middleware_1 = require("./middleware/session.middleware");
const auth_debug_middleware_1 = require("./middleware/auth-debug.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_debug_middleware_1.AuthDebugMiddleware).forRoutes('*');
        consumer.apply(session_middleware_1.SessionMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
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
                        ssl: { rejectUnauthorized: false },
                    };
                },
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                sortSchema: true,
                playground: true,
                introspection: true,
            }),
            cache_manager_1.CacheModule.register({
                ttl: 10,
                max: 100,
                isGlobal: true,
            }),
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            orders_module_1.OrdersModule,
            users_module_1.UsersModule,
            reviews_module_1.ReviewsModule,
            storage_module_1.StorageModule,
            products_module_1.ProductsModule,
            auth_module_1.AuthModule.forRoot(),
        ],
        controllers: [pages_controller_1.PagesController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map