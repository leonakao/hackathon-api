import { StoreEntity } from 'src/shared/types';
import { Summary } from '../entities/summary.entity';
import { Profile } from '../entities/profile.entity';

export interface SummaryWithProfile extends Summary, Profile {}

export abstract class SummaryRepository {
  abstract store(summary: StoreEntity<Summary>): Promise<Summary>;

  abstract listByGroup(groupId: string): Promise<SummaryWithProfile[]>;
}
