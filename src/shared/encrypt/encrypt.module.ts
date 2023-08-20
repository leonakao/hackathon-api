import { Module } from '@nestjs/common';
import { EncryptService } from './services/encrypt.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'EncryptService',
      useClass: EncryptService,
    },
  ],
  exports: [EncryptService],
})
export class AppModule {}
