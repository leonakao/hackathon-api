import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import configuration from '../config/configuration';
import { AuthModule } from 'src/modules/auth/auth.module';
import { EncryptModule } from '../encrypt/encrypt.module';
import { UserModule } from 'src/modules/user/user.module';
import { SummaryModule } from 'src/modules/summary/summary.module';
import { GroupModule } from 'src/modules/group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    EncryptModule,
    UserModule,
    GroupModule,
    AuthModule,
    SummaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
