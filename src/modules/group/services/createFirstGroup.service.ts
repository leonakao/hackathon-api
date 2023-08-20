import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../repositories/group.repository';
import { GroupUserRepository } from '../repositories/groupUser.repository';
import { randomUUID } from 'crypto';
import { Group } from '../entities/group.entity';

@Injectable()
export class CreateFirstGroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly groupUserRepository: GroupUserRepository,
  ) {}

  async execute(userId: string): Promise<Group> {
    const group = await this.groupRepository.store({
      id: randomUUID(),
      name: 'Meus Resumos',
      description: 'Aqui você encontra seus resumos gerados',
      protected: true,
      createdBy: userId,
    });

    await this.groupUserRepository.store({
      id: randomUUID(),
      groupId: group.id,
      userId,
      addedBy: userId,
      isAdmin: true,
    });

    return group;
  }
}
