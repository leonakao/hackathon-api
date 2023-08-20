import { GroupUserRepository } from '../repositories/groupUser.repository';
import { FindProtectedGroupService } from './findProtectedGroup.service';

describe('Find Protected Group Service', () => {
  let sut = <FindProtectedGroupService>{};
  let groupUserRepository = <GroupUserRepository>{};

  beforeEach(() => {
    groupUserRepository = {
      findProtectedByUserId: jest.fn().mockResolvedValue({
        id: 'any_id',
        name: 'any_name',
        description: 'any_description',
        protected: true,
        createdBy: 'any_user_id',
      }),
    } as any;

    sut = new FindProtectedGroupService(groupUserRepository);
  });

  it('should store group with user id', async () => {
    await sut.execute('any_user_id');

    expect(groupUserRepository.findProtectedByUserId).toHaveBeenCalledWith(
      'any_user_id',
    );
  });

  it('should throw if group not found', async () => {
    jest
      .spyOn(groupUserRepository, 'findProtectedByUserId')
      .mockResolvedValueOnce(undefined);

    await expect(sut.execute('any_user_id')).rejects.toThrow(
      new Error('User group not found'),
    );
  });
});
