import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordColumnToUser1704255803442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "password" TEXT;`);
    await queryRunner.query(`UPDATE "user" SET "password" = '1234' WHERE "password" IS NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password";`);
  }
}
