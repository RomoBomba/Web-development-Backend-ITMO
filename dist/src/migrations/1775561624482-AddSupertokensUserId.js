"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSupertokensUserId1775561624482 = void 0;
class AddSupertokensUserId1775561624482 {
    name = 'AddSupertokensUserId1775561624482';
    async up(queryRunner) {
        const columnExists = await queryRunner.hasColumn('users', 'supertokensUserId');
        if (!columnExists) {
            await queryRunner.query(`ALTER TABLE "users" ADD "supertokensUserId" character varying UNIQUE`);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "supertokensUserId"`);
    }
}
exports.AddSupertokensUserId1775561624482 = AddSupertokensUserId1775561624482;
//# sourceMappingURL=1775561624482-AddSupertokensUserId.js.map