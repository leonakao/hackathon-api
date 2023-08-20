import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findBy<Key extends keyof User>(
    key: Key,
    value: User[Key],
  ): Promise<User | undefined>;
}
