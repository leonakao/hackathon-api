import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GroupSummaryRepository } from '../groupSummary.repository';
import { GroupSummary } from '../../entities/groupSummary.entity';

@Injectable()
export class GroupSummaryTypeOrmRepository extends GroupSummaryRepository {
  private readonly repository: Repository<GroupSummary>;

  constructor(private readonly dataSource: DataSource) {
    super();

    this.repository = this.dataSource.getRepository(GroupSummary);
  }

  async store(
    groupSummary: Omit<GroupSummary, 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ) {
    return await this.repository.save(groupSummary);
  }
}
