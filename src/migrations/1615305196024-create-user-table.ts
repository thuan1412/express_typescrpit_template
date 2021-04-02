import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserTable1615305196024 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "first_name",
            type: "varchar",
          },
          {
            name: "last_name",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("user");
  }
}
