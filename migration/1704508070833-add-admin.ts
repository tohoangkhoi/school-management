import bcrypt from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";
export class AddAdmin1704508070833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Your logic to check if the record already exists

    const SALT_ROUNDS = 10;
    const ADMIN_DEFAULT_PASSWORD = "244224";
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashPassword = bcrypt.hashSync(ADMIN_DEFAULT_PASSWORD, salt);
    const existingRecord = await queryRunner.query(`SELECT * FROM "user" WHERE "firstName" = 'Minh' AND "lastName" = 'Trang'`);

    if (existingRecord.length === 0) {
      // Insert the record if it doesn't exist
      await queryRunner.query(`INSERT INTO "user" ("firstName", "lastName", "password") VALUES ('Minh', 'Trang', '${hashPassword}');`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Your logic for the down migration (rollback)

    // Rollback by deleting the inserted record
    await queryRunner.query(`DELETE FROM "user" WHERE "firstName" = 'Minh' AND "lastName" = 'Trang'`);
  }
}
