import { NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repostiories/user.repository';
import { UserService } from './user.service';

describe('User Service', () => {
  let sut = <UserService>{};
  let userRepository = <UserRepository>{};

  beforeEach(() => {
    userRepository = {
      findBy: jest.fn().mockResolvedValue({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      }),
    } as any;

    sut = new UserService(userRepository);
  });

  describe('findBy', () => {
    it('should call userRepository.findBy with correct params', async () => {
      const findBySpy = jest.spyOn(userRepository, 'findBy');

      await sut.findBy('email', 'any_email');

      expect(findBySpy).toHaveBeenCalledWith('email', 'any_email');
    });

    it('should throw if userRepository.findBy returns undefined', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValue(undefined);

      await expect(sut.findBy('email', 'any_email')).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });

    it('should return the user if userRepository.findBy returns a user', async () => {
      const user = await sut.findBy('email', 'any_email');

      expect(user).toEqual({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      });
    });
  });
});
