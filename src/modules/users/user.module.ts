import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repostiories/user.repository';
import { UserTypeOrmRepository } from './repostiories/implementation/user.typeorm';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepository,
    },
    {
      provide: UserService,
      useClass: UserService,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
