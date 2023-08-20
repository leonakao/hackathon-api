import { GroupRepository } from '../repositories/group.repository';
import { GroupUserRepository } from '../repositories/groupUser.repository';
import { CreateFirstGroupService } from './createFirstGroup.service';

describe('Create First Group Service', () => {
  let sut = <CreateFirstGroupService>{};
  let groupRepository = <GroupRepository>{};
  let groupUserRepository = <GroupUserRepository>{};

  beforeEach(() => {
    groupRepository = {
      store: jest.fn().mockResolvedValue({
        id: 'any_id',
        name: 'any_name',
        description: 'any_description',
        protected: true,
        createdBy: 'any_user_id',
      }),
    } as any;
    groupUserRepository = {
      store: jest.fn().mockResolvedValue({
        id: 'any_id',
        groupId: 'any_group_id',
        userId: 'any_user_id',
        addedBy: 'any_user_id',
        isAdmin: true,
      }),
    } as any;

    sut = new CreateFirstGroupService(groupRepository, groupUserRepository);
  });

  it('should store group with user id', async () => {
    await sut.execute('any_user_id');

    expect(groupRepository.store).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'Meus Resumos',
      description: 'Aqui você encontra seus resumos gerados',
      protected: true,
      createdBy: 'any_user_id',
    });
  });

  it('should store group user with user id and group_id', async () => {
    await sut.execute('any_user_id');

    expect(groupUserRepository.store).toHaveBeenCalledWith({
      id: expect.any(String),
      groupId: 'any_id',
      userId: 'any_user_id',
      addedBy: 'any_user_id',
      isAdmin: true,
    });
  });
});
