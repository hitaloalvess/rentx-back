import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersToken1647710685819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users_token",
                columns: [
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"refresh_token",
                        type:"varchar",
                    },
                    {
                        name:"user_id",
                        type:"uuid"
                    },
                    {
                        name:"expires_date",
                        type:"timestamp"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys:[
                    {
                        name: 'FKUserToken', // Nome da chave estrangeira
                        referencedTableName: 'users', // Nome da tabela referenciada
                        referencedColumnNames: ['id'], // Nome do campo na tabela referenciada, ao qual esta sendo referenciado nesta tabela
                        columnNames: ['user_id'], // Nome do campo nesta tabela, que corresponde a chave estrangeira
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_token");
    }

}
