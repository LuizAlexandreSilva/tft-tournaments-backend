import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTournamentBrackets1593476887717
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tournament_brackets',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'tournament_id',
            type: 'integer',
          },
          {
            name: 'num_phase',
            type: 'integer',
          },
          {
            name: 'player_nickname',
            type: 'varchar',
          },
          {
            name: 'bracket_number',
            type: 'integer',
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
            name: 'BracketTournament',
            referencedTableName: 'tournaments',
            referencedColumnNames: ['id'],
            columnNames: ['tournament_id'],
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tournament_brackets');
  }
}
