import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../../entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserTypeOrmRepository extends UserRepository {
  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    super();

    this.repository = this.dataSource.getRepository(User);
  }

  async findBy<Key extends keyof User>(
    key: Key,
    value: User[Key],
  ): Promise<User | undefined> {
    return await this.repository.findOne({ where: { [key]: value } });
  }

  async store(user: Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    console.log(user);
    return await this.repository.save(user);
  }
}
