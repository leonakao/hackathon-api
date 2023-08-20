import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Group } from '../../entities/group.entity';
import { GroupRepository } from '../group.repository';

@Injectable()
export class GroupTypeOrmRepository extends GroupRepository {
  private readonly repository: Repository<Group>;

  constructor(private readonly dataSource: DataSource) {
    super();

    this.repository = this.dataSource.getRepository(Group);
  }

  async store(group: Omit<Group, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    return await this.repository.save(group);
  }

  async list(userId: string): Promise<Group[]> {
    const query = this.repository.createQueryBuilder();

    return await query
      .innerJoin('group_users', 'groupUser', 'groupUser.group_id = Group.id')
      .where('groupUser.user_id = :userId', { userId })
      .andWhere('Group.deleted_at IS NULL')
      .getMany();
  }
}
