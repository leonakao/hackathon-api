import { StoreEntity } from 'src/shared/types';
import { GroupSummary } from '../entities/groupSummary.entity';

export abstract class GroupSummaryRepository {
  abstract store(
    groupSummary: StoreEntity<GroupSummary>,
  ): Promise<GroupSummary>;
}
