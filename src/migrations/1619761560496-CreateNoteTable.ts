import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNoteTable1619761560496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "note",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "content",
            type: "text",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("note");
  }
}
