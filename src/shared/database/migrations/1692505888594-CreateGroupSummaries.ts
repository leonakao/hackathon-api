import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateGroupSummaries1692505888594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'group_summaries',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'summary_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'group_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'added_by',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'group_summaries',
      new TableForeignKey({
        columnNames: ['summary_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'summaries',
      }),
    );

    await queryRunner.createForeignKey(
      'group_summaries',
      new TableForeignKey({
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('group_summaries');
  }
}
