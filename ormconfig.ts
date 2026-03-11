import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '.env') });

const isRender = process.env.DB_HOST?.includes('render.com');

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(__dirname, 'src', 'entities', '*.entity.{ts,js}')],
    migrations: [join(__dirname, 'src', 'migrations', '*.{ts,js}')],
    synchronize: false,
    logging: true,
    connectTimeoutMS: 60000,
    maxQueryExecutionTime: 60000,
    ...(isRender ? {
        ssl: {
            rejectUnauthorized: false
        },
        extra: {
            ssl: {
                rejectUnauthorized: false
            },
            connectionTimeoutMillis: 60000,
            query_timeout: 60000,
            statement_timeout: 60000
        }
    } : {})
});