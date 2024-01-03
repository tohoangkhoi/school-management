import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdminUser1704256031523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Your logic to check if the record already exists
    const existingRecord = await queryRunner.query(`SELECT * FROM "user" WHERE "firstName" = 'Minh' AND "lastName" = 'Trang'`);

    if (existingRecord.length === 0) {
      // Insert the record if it doesn't exist
      await queryRunner.query(`INSERT INTO "user" ("firstName", "lastName", "password") VALUES (?)`, ["Minh", "Trang", "123456"]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Your logic for the down migration (rollback)

    // Rollback by deleting the inserted record
    await queryRunner.query(`DELETE FROM "user" WHERE "firstName" = 'Minh' AND "lastName" = 'Trang'`);
  }
}
