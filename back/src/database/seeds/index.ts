import { connectionSource } from '../../config/typeorm';
import { UsersSeed } from './users-seed';

async function seeds () {
    await connectionSource.initialize();
    const queryRunner = connectionSource.createQueryRunner('master');
    await new UsersSeed().run(queryRunner);
}

seeds()
    .then(() => console.log('success'))
    .catch((error) => console.error(error));

