import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/services/user.service';
import { EncryptService } from 'src/shared/encrypt/services/encrypt.service';
import { AuthenticationException } from 'src/shared/exceptions/authentication.exception';

@Injectable()
export class SignInService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userService.findBy('email', email).catch((err) => {
      if (err.message === 'User not found') {
        throw new AuthenticationException('Invalid email or password');
      }

      throw err;
    });

    const isMatchPassword = await this.encryptService.compare(
      user.password,
      password,
    );

    if (!isMatchPassword) {
      throw new AuthenticationException('Invalid email or password');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
