import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addLastestActionColToNoteTable1619770443087
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "note",
      new TableColumn({
        name: "lastest_action",
        type: "int",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("note", "lastest_action");
  }
}
