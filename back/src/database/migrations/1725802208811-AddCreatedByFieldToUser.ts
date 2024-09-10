import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddCreatedByFieldToUser1725802208811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('users');
        await queryRunner.createForeignKey(
            table,
            new TableForeignKey({
                columnNames: ['createdBy'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE'
            })

        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('users');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('createdBy') !== -1);
        await queryRunner.dropForeignKey('users', foreignKey);
    }

}
