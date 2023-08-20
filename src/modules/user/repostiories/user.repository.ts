import { StoreEntity } from 'src/shared/types';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findBy<Key extends keyof User>(
    key: Key,
    value: User[Key],
  ): Promise<User | undefined>;

  abstract store(user: StoreEntity<User>): Promise<User>;
}
