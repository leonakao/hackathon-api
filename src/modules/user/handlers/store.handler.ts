import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repostiories/user.repository';
import { Gender } from '../enums';
import { randomUUID } from 'crypto';
import { EncryptService } from '../../../shared/encrypt/services/encrypt.service';
import { CreateFirstGroupService } from '../../group/services/createFirstGroup.service';

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
    private readonly createFirstGroup: CreateFirstGroupService,
  ) {}

  async execute(userDto: StoreUserDto) {
    const password = await this.encryptService.hash(userDto.password);

    const user = await this.userRepository.store({
      ...userDto,
      id: randomUUID(),
      password,
    });

    delete user.password;

    await this.createFirstGroup.execute(user.id);

    return user;
  }
}
