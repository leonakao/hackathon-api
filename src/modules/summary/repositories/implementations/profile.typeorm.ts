import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProfileRepository } from '../profile.repository';
import { Profile } from '../../entities/profile.entity';

@Injectable()
export class ProfileTypeOrmRepository extends ProfileRepository {
  private readonly repository: Repository<Profile>;

  constructor(private readonly dataSource: DataSource) {
    super();

    this.repository = this.dataSource.getRepository(Profile);
  }

  async store(profile: Omit<Profile, 'createdAt' | 'updatedAt' | 'deletedAt'>) {
    return await this.repository.save(profile);
  }
}
