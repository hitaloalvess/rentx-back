import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRentals1646329831654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'start_date',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'expected_return_date',
            type: 'timestamp',
          },
          {
            name: 'total',
            type: 'numeric',
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
            name: 'FKCarRentals', // Nome da chave estrangeira
            referencedTableName: 'cars', // Nome da tabela referenciada
            referencedColumnNames: ['id'], // Nome do campo na tabela referenciada, ao qual esta sendo referenciado nesta tabela
            columnNames: ['car_id'], // Nome do campo nesta tabela, que corresponde a chave estrangeira
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKUserRentals', // Nome da chave estrangeira
            referencedTableName: 'users', // Nome da tabela referenciada
            referencedColumnNames: ['id'], // Nome do campo na tabela referenciada, ao qual esta sendo referenciado nesta tabela
            columnNames: ['user_id'], // Nome do campo nesta tabela, que corresponde a chave estrangeira
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentals');
  }
}
