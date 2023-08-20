import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import configuration from '../config/configuration';
import { AuthModule } from 'src/modules/auth/auth.module';
import { EncryptModule } from '../encrypt/encrypt.module';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DatabaseModule,
    EncryptModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
