import { Injectable } from '@nestjs/common';
import { GroupUserRepository } from '../repositories/groupUser.repository';
import { GroupUser } from '../entities/groupUser.entity';

@Injectable()
export class FindProtectedGroupService {
  constructor(private readonly groupUserRepository: GroupUserRepository) {}

  async execute(userId: string): Promise<GroupUser> {
    const groupUser = await this.groupUserRepository.findProtectedByUserId(
      userId,
    );

    if (!groupUser) {
      throw new Error('User group not found');
    }

    return groupUser;
  }
}
