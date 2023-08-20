import { StoreEntity } from 'src/shared/types';
import { GroupUser } from '../entities/groupUser.entity';

export abstract class GroupUserRepository {
  abstract store(groupUser: StoreEntity<GroupUser>): Promise<GroupUser>;

  abstract findProtectedByUserId(userId: string): Promise<GroupUser | null>;
}
