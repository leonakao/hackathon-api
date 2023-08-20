import { Injectable } from '@nestjs/common';
import { Queue } from '../../entities/queue.entity';
import { DataSource, Repository } from 'typeorm';
import { QueueRepository } from '../queue.repository';

@Injectable()
export class QueueTypeOrmRepository extends QueueRepository {
  private readonly repository: Repository<Queue>;

  constructor(private readonly dataSource: DataSource) {
    super();

    this.repository = this.dataSource.getRepository(Queue);
  }

  async store(queue: Omit<Queue, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    return await this.repository.save(queue);
  }
}
