import { Injectable } from '@nestjs/common';
import { SummaryRepository } from '../summary.repository';
import { Summary } from '../../entities/summary.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SummaryTypeOrmRepository extends SummaryRepository {
  private readonly repository: Repository<Summary>;

  constructor(private readonly dataSource: DataSource) {
    super();

    this.repository = this.dataSource.getRepository(Summary);
  }

  async store(summary: Omit<Summary, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    return await this.repository.save(summary);
  }

  async listByGroup(groupId: string) {
    const query = this.repository.createQueryBuilder('summary');

    return await query
      .innerJoin(
        'group_summaries',
        'groupSumary',
        'groupSumary.summary_id = summary.id',
      )
      .where('groupSumary.group_id = :groupId', { groupId })
      .orderBy('summary.updated_at', 'DESC')
      .getMany();
  }
}
