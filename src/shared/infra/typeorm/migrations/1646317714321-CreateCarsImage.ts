import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarsImage1646317714321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_image',
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
            name: 'image_name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCarImage', // Nome da chave estrangeira
            referencedTableName: 'cars', // Nome da tabela referenciada
            referencedColumnNames: ['id'], // Nome do campo na tabela referenciada, ao qual esta sendo referenciado nesta tabela
            columnNames: ['car_id'], // Nome do campo nesta tabela, que corresponde a chave estrangeira
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_image');
  }
}
