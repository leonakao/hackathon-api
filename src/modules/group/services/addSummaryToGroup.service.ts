import { Injectable } from '@nestjs/common';
import { GroupSummaryRepository } from '../repositories/groupSummary.repository';
import { GroupSummary } from '../entities/groupSummary.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AddSummaryToGroupService {
  constructor(
    private readonly groupSummaryRepository: GroupSummaryRepository,
  ) {}

  async execute(
    summaryId: string,
    groupId: string,
    userId: string,
  ): Promise<GroupSummary> {
    return this.groupSummaryRepository.store({
      id: randomUUID(),
      summaryId,
      groupId,
      addedBy: userId,
    });
  }
}
