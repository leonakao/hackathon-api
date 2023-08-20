import { Module } from '@nestjs/common';
import { SignInService } from './services/signIn.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { EncryptModule } from 'src/shared/encrypt/encrypt.module';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

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
    ConfigModule,
    UserModule,
    EncryptModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: SignInService,
      useClass: SignInService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
