import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repostiories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findBy<Key extends keyof User>(
    key: Key,
    value: User[Key],
  ): Promise<User> {
    const user = await this.userRepository.findBy(key, value);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
