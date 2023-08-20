import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GroupUser } from '../../entities/groupUser.entity';
import { GroupUserRepository } from '../groupUser.repository';

@Injectable()
export class GroupUserTypeOrmRepository extends GroupUserRepository {
  private readonly repository: Repository<GroupUser>;

  constructor(private readonly dataSource: DataSource) {
    super();

    this.repository = this.dataSource.getRepository(GroupUser);
  }

  async store(
    groupUser: Omit<GroupUser, 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ) {
    return await this.repository.save(groupUser);
  }

  async findProtectedByUserId(userId: string): Promise<GroupUser | null> {
    const query = this.repository.createQueryBuilder();

    return await query
      .innerJoin('groups', 'group', 'group.id = GroupUser.group_id')
      .where('user_id = :userId', { userId })
      .andWhere('group.deleted_at IS NULL')
      .andWhere('group.protected = true')
      .getOne();
  }
}
