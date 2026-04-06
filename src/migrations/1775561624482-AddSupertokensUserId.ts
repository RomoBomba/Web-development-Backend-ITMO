import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSupertokensUserId1775561624482 implements MigrationInterface {
    name = 'AddSupertokensUserId1775561624482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExists = await queryRunner.hasColumn('users', 'supertokensUserId');
        if (!columnExists) {
            await queryRunner.query(`ALTER TABLE "users" ADD "supertokensUserId" character varying UNIQUE`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "supertokensUserId"`);
    }
}