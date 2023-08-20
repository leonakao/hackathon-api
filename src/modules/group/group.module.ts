import { Module } from '@nestjs/common';
import { CreateFirstGroupService } from './services/createFirstGroup.service';
import { GroupRepository } from './repositories/group.repository';
import { GroupTypeOrmRepository } from './repositories/implementations/group.typeorm';
import { GroupUserRepository } from './repositories/groupUser.repository';
import { GroupUserTypeOrmRepository } from './repositories/implementations/groupUser.typeorm';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: CreateFirstGroupService,
      useClass: CreateFirstGroupService,
    },
    {
      provide: GroupRepository,
      useClass: GroupTypeOrmRepository,
    },
    {
      provide: GroupUserRepository,
      useClass: GroupUserTypeOrmRepository,
    },
  ],
  exports: [CreateFirstGroupService],
})
export class GroupModule {}
