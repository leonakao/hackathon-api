import { UnauthorizedException } from '@nestjs/common';
import { SignInService } from './signIn.service';
import { UserService } from 'src/modules/user/services/user.service';
import { EncryptService } from 'src/shared/encrypt/services/encrypt.service';
import { JwtService } from '@nestjs/jwt';

describe('Sign In Service', () => {
  let sut = <SignInService>{};
  let userService = <UserService>{};
  let encryptService = <EncryptService>{};
  let jwtService = <JwtService>{};

  beforeEach(() => {
    userService = {
      findBy: jest.fn().mockResolvedValue({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      }),
    } as any;

    encryptService = {
      compare: jest.fn().mockResolvedValue(true),
    } as any;

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('any_token'),
    } as any;

    sut = new SignInService(userService, encryptService, jwtService);
  });

  it('should find user by email', async () => {
    await sut.execute('any_email', 'any_password');

    expect(userService.findBy).toHaveBeenCalledWith('email', 'any_email');
  });

  it('should compare password', async () => {
    await sut.execute('any_email', 'any_password');

    expect(encryptService.compare).toHaveBeenCalledWith(
      'any_password',
      'any_password',
    );
  });

  it('should throw if password not match', async () => {
    jest.spyOn(encryptService, 'compare').mockResolvedValueOnce(false);

    await expect(sut.execute('any_email', 'any_password')).rejects.toThrow(
      new UnauthorizedException('Invalid email or password'),
    );
  });

  it('should return token', async () => {
    const response = await sut.execute('any_email', 'any_password');

    expect(response).toEqual({
      token: expect.any(String),
    });
  });

  it('should return token with user id, name and email', async () => {
    await sut.execute('any_email', 'any_password');

    expect(jwtService.signAsync).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
    });
  });

  it('should throw if jwt service throws', async () => {
    jest.spyOn(jwtService, 'signAsync').mockRejectedValueOnce(new Error());

    await expect(sut.execute('any_email', 'any_password')).rejects.toThrow();
  });

  it('should throw if encrypt service throws', async () => {
    jest.spyOn(encryptService, 'compare').mockRejectedValueOnce(new Error());

    await expect(sut.execute('any_email', 'any_password')).rejects.toThrow();
  });
});
