import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repostiories/user.repository';
import { UserTypeOrmRepository } from './repostiories/implementation/user.typeorm';
import { UserController } from './controllers/user.controller';
import { StoreUserHandler } from './handlers/store.handler';
import { EncryptModule } from 'src/shared/encrypt/encrypt.module';

@Module({
  imports: [EncryptModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepository,
    },
    {
      provide: UserService,
      useClass: UserService,
    },
    {
      provide: StoreUserHandler,
      useClass: StoreUserHandler,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
