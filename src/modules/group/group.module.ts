import { Module } from '@nestjs/common';
import { CreateFirstGroupService } from './services/createFirstGroup.service';
import { GroupRepository } from './repositories/group.repository';
import { GroupTypeOrmRepository } from './repositories/implementations/group.typeorm';
import { GroupUserRepository } from './repositories/groupUser.repository';
import { GroupUserTypeOrmRepository } from './repositories/implementations/groupUser.typeorm';
import { FindProtectedGroupService } from './services/findProtectedGroup.service';
import { GroupSummaryRepository } from './repositories/groupSummary.repository';
import { AddSummaryToGroupService } from './services/addSummaryToGroup.service';
import { GroupSummaryTypeOrmRepository } from './repositories/implementations/groupSummary.typeorm';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: CreateFirstGroupService,
      useClass: CreateFirstGroupService,
    },
    {
      provide: FindProtectedGroupService,
      useClass: FindProtectedGroupService,
    },
    {
      provide: AddSummaryToGroupService,
      useClass: AddSummaryToGroupService,
    },
    {
      provide: GroupSummaryRepository,
      useClass: GroupSummaryTypeOrmRepository,
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
  exports: [
    CreateFirstGroupService,
    FindProtectedGroupService,
    AddSummaryToGroupService,
  ],
})
export class GroupModule {}
