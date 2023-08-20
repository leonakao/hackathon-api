import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../repositories/group.repository';

@Injectable()
export class ListGroupHandler {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(userId: string) {
    return await this.groupRepository.list(userId);
  }
}
