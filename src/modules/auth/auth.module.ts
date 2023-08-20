import { Module } from '@nestjs/common';
import { SignInService } from './services/signIn.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { EncryptModule } from 'src/shared/encrypt/encrypt.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10d' },
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
