import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthenticationException extends HttpException {
  constructor(message?: string) {
    super(message ?? 'Authentication failed', HttpStatus.UNAUTHORIZED);
  }
}
