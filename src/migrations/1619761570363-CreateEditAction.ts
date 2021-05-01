import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEditAction1619761570363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "edit_action",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "action",
            type: "jsonb",
          },
          {
            name: "action_time",
            type: "timestamp",
          },
          {
            name: "note_id",
            type: "int",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
