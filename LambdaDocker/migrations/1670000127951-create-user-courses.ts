import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserCourses1670000127951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.createTable(
        new Table({
          name: "courses",
          columns: [
            { name: "id", type: "uuid", isPrimary: true },
            { name: "title", type: "string" },
            { name: "logo", type: "string" },
            { name: "poster", type: "string" },
            { name: "color", type: "string" },
            { name: "minutes", type: "float" },
            { name: "description", type: "string", isNullable: true },
            { name: "created_at", type: "timestamptz" },
            { name: "updated_at", type: "timestamptz" },
            { name: "deleted_at", type: "timestamptz", isNullable: true },
          ],
        })
      ),
      queryRunner.createTable(
        new Table({
          // nomeDaTabelaOriginal_nomeDoCampoManyToManyDaEntity_nomeDaOutraTabela
          name: "users_user_courses_courses",
          columns: [
            { name: "id", type: "uuid", isPrimary: true },
            { name: "course_id", type: "uuid" },
            { name: "user_id", type: "uuid" },
            { name: "started", type: "boolean", default: false },
            { name: "current_second", type: "boolean", default: false },
            { name: "created_at", type: "timestampz" },
            { name: "updated_at", type: "timestampz" },
            { name: "deleted_at", type: "timestampz", isNullable: true },
          ],
          foreignKeys: [
            {
              columnNames: ["course_id"],
              referencedTableName: "courses",
              referencedColumnNames: ["id"],
            },
            {
              columnNames: ["user_id"],
              referencedTableName: "users",
              referencedColumnNames: ["id"],
            },
          ],
        })
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropTable("courses"),
      queryRunner.dropTable("users_user_courses_courses"),
    ]);
  }
}
