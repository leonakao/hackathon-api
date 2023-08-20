import { EncryptService } from 'src/shared/encrypt/services/encrypt.service';
import { UserRepository } from '../repostiories/user.repository';
import { StoreUserHandler } from './store.handler';
import { CreateFirstGroupService } from 'src/modules/group/services/createFirstGroup.service';

describe('Store User Handler', () => {
  let sut = <StoreUserHandler>{};
  let userRepository = <UserRepository>{};
  let encryptService = <EncryptService>{};
  let createFirstGroup = <CreateFirstGroupService>{};

  beforeEach(() => {
    userRepository = {
      store: jest.fn().mockResolvedValue({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      }),
    } as any;
    encryptService = {
      hash: jest.fn().mockResolvedValue('hash_password'),
    } as any;
    createFirstGroup = {
      execute: jest.fn(),
    } as any;

    sut = new StoreUserHandler(
      userRepository,
      encryptService,
      createFirstGroup,
    );
  });

  it('should be defined', () => {
    expect(true).toBeTruthy();
  });

  it('should encrypt password before store', async () => {
    await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(userRepository.store).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'any_name',
      email: 'any_email',
      password: 'hash_password',
    });
    expect(encryptService.hash).toHaveBeenCalledWith('any_password');
  });

  it('should create first group for user', async () => {
    await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(createFirstGroup.execute).toHaveBeenCalledWith('any_id');
  });

  it('should return user without password', async () => {
    const user = await sut.execute({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(user).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
    });
  });
});
