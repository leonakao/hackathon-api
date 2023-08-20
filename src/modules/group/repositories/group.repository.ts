import { StoreEntity } from 'src/shared/types';
import { Group } from '../entities/group.entity';

export abstract class GroupRepository {
  abstract store(group: StoreEntity<Group>): Promise<Group>;
}
