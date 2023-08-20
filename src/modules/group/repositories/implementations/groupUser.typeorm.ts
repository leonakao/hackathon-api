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
}
