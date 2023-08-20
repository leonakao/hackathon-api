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

@Module({
  imports: [GroupModule],
  controllers: [StoreSummaryController],
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
      provide: SummaryRepository,
      useClass: SummaryTypeOrmRepository,
    },
    {
      provide: SummaryStoreHandler,
      useClass: SummaryStoreHandler,
    },
  ],
})
export class SummaryModule {}
