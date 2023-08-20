import { Body, Controller, Post } from '@nestjs/common';
import { StoreUserDto, StoreUserHandler } from '../handlers/store.handler';

@Controller('users')
export class UserController {
  constructor(private readonly storeUserHandler: StoreUserHandler) {}

  @Post()
  async store(@Body() body: StoreUserDto) {
    const user = await this.storeUserHandler.execute(body);

    return user;
  }
}
