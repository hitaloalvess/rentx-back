import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSpecificationsCars1645820088626
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKCarSpecification', // Nome da chave estrangeira
        referencedTableName: 'cars', // Nome da tabela referenciada
        referencedColumnNames: ['id'], // Nome do campo na tabela referenciada, ao qual esta sendo referenciado nesta tabela
        columnNames: ['car_id'], // Nome do campo nesta tabela, que corresponde a chave estrangeira
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKSpecificationCar', // Nome da chave estrangeira
        referencedTableName: 'specifications', // Nome da tabela referenciada
        referencedColumnNames: ['id'], // Nome do campo na tabela referenciada, ao qual esta sendo referenciado nesta tabela
        columnNames: ['specification_id'], // Nome do campo nesta tabela, que corresponde a chave estrangeira
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKCarSpecification',
    );

    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKSpecificationCar',
    );
  }
}
