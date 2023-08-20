import { Body, Controller, Post } from '@nestjs/common';
import { StoreUserDto, StoreUserHandler } from '../handlers/store.handler';
import { Public } from 'src/modules/auth/decorator/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly storeUserHandler: StoreUserHandler) {}

  @Public()
  @Post()
  async store(@Body() body: StoreUserDto) {
    const user = await this.storeUserHandler.execute(body);

    return user;
  }
}
