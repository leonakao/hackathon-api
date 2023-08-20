import { Body, Controller, Post } from '@nestjs/common';
import { SignInService } from './services/signIn.service';
import { SignInDTO } from './dtos/signId.dto';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly signInService: SignInService) {}

  /**
   * Create a route that will call and use the SignInService
   */
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDTO) {
    return await this.signInService.execute(
      signInDto.email,
      signInDto.password,
    );
  }
}
