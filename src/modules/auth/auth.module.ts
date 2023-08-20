import { Module } from '@nestjs/common';
import { SignInService } from './services/signIn.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { EncryptModule } from 'src/shared/encrypt/encrypt.module';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: {
          expiresIn: '10d',
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EncryptModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: SignInService,
      useClass: SignInService,
    },
  ],
})
export class AuthModule {}
