import { QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../config/types/role';

export class UsersSeed {
    public async run(queryRunner: QueryRunner) {
        await queryRunner.manager.createQueryBuilder()
            .insert()
            .into('users')
            .values({
                role: Role.ADMIN,
                email: 'admin@admin.com',
                password: await bcrypt.hash('12345', 12),
            })
            .execute();
    }
}

