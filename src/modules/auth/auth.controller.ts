import { Body, Controller, Post } from '@nestjs/common';
import { SignInService } from './services/signIn.service';
import { SignInDTO } from './dtos/signId.dto';
import { Public } from './decorator/public.decorator';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDTO) {
    return await this.signInService.execute(
      signInDto.email,
      signInDto.password,
    );
  }
}
