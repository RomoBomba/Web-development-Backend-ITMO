import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Init1771938247195 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
