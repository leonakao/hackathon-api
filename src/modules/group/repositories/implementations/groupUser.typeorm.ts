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

  async findProtectedByUserId(userId: string): Promise<GroupUser | undefined> {
    const query = this.repository.createQueryBuilder();

    return await query
      .innerJoin('group', 'group', 'group.id = groupUser.groupId')
      .where('userId = :userId', { userId })
      .andWhere('group.deletedAt IS NULL')
      .andWhere('group.protected', { protected: true })
      .select('groupUser.*')
      .getOne();
  }
}
