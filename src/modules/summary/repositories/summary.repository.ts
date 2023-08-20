import { StoreEntity } from 'src/shared/types';
import { Summary } from '../entities/summary.entity';

export abstract class SummaryRepository {
  abstract store(summary: StoreEntity<Summary>): Promise<Summary>;

  abstract listByGroup(groupId: string): Promise<Summary[]>;
}
