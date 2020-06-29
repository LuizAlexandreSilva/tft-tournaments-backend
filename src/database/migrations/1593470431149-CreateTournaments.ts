import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTournaments1593470431149
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tournaments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'owner_id',
            type: 'integer',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'integer',
            enum: ['0', '1', '2'],
            default: 0,
          },
          {
            name: 'num_players',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'first_place',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'second_place',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'third_place',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fourth_place',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'TournamentOwner',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['owner_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tournaments');
  }
}
