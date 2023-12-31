import { Module } from '@nestjs/common';
import { FileInputRepository } from './repositories/fileInput.repository';
import { FileInputTypeOrmRepository } from './repositories/implementations/fileInput.typeorm';
import { ProfileRepository } from './repositories/profile.repository';
import { ProfileTypeOrmRepository } from './repositories/implementations/profile.typeorm';
import { SummaryTypeOrmRepository } from './repositories/implementations/summary.typeorm';
import { SummaryRepository } from './repositories/summary.repository';
import { StoreSummaryController } from './controllers/store-summary.controller';
import { SummaryStoreHandler } from './handlers/store.handler';
import { GroupModule } from '../group/group.module';
import { ListByGroupHandler } from './handlers/listByGroup.handler';
import { ListSummaryController } from './controllers/list-summary.controller';
import { QueueRepository } from './repositories/queue.repository';
import { QueueTypeOrmRepository } from './repositories/implementations/queue.typeorm';

@Module({
  imports: [GroupModule],
  controllers: [StoreSummaryController, ListSummaryController],
  providers: [
    {
      provide: FileInputRepository,
      useClass: FileInputTypeOrmRepository,
    },
    {
      provide: ProfileRepository,
      useClass: ProfileTypeOrmRepository,
    },
    {
      provide: QueueRepository,
      useClass: QueueTypeOrmRepository,
    },
    {
      provide: SummaryRepository,
      useClass: SummaryTypeOrmRepository,
    },
    {
      provide: SummaryStoreHandler,
      useClass: SummaryStoreHandler,
    },
    {
      provide: ListByGroupHandler,
      useClass: ListByGroupHandler,
    },
  ],
})
export class SummaryModule {}
