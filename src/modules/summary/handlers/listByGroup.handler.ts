import { Injectable } from '@nestjs/common';
import { SummaryRepository } from '../repositories/summary.repository';

@Injectable()
export class ListByGroupHandler {
  constructor(private readonly summaryRepository: SummaryRepository) {}

  async execute(groupId: string) {
    return await this.summaryRepository.listByGroup(groupId);
  }
}
