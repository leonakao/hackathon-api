import { StoreEntity } from 'src/shared/types';
import { Queue } from '../entities/queue.entity';

export abstract class QueueRepository {
  abstract store(queue: StoreEntity<Queue>): Promise<Queue>;
}
