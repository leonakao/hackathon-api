import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repostiories/user.repository';
import { Gender } from '../enums';
import { randomUUID } from 'crypto';
import { EncryptService } from 'src/shared/encrypt/services/encrypt.service';

export interface StoreUserDto {
  name: string;
  email: string;
  password: string;
  gender?: Gender;
  document?: string;
  phone?: string;
  age?: number;
}

@Injectable()
export class StoreUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async execute(user: StoreUserDto) {
    const password = await this.encryptService.hash(user.password);

    const newUser = await this.userRepository.store({
      ...user,
      id: randomUUID(),
      password,
    });

    delete newUser.password;

    return newUser;
  }
}
