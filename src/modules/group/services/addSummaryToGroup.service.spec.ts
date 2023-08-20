import { GroupSummaryRepository } from '../repositories/groupSummary.repository';
import { AddSummaryToGroupService } from './addSummaryToGroup.service';

describe('Add Summary To Group Service', () => {
  let sut = <AddSummaryToGroupService>{};
  let groupSummaryRepository = <GroupSummaryRepository>{};

  beforeEach(() => {
    groupSummaryRepository = {
      store: jest.fn().mockResolvedValue({
        id: 'any_id',
        summaryId: 'any_summary_id',
        groupId: 'any_group_id',
        addedBy: 'any_user_id',
      }),
    } as any;

    sut = new AddSummaryToGroupService(groupSummaryRepository);
  });

  it('should store group summary with summary id, group id and user id', async () => {
    await sut.execute('any_summary_id', 'any_group_id', 'any_user_id');

    expect(groupSummaryRepository.store).toHaveBeenCalledWith({
      id: expect.any(String),
      summaryId: 'any_summary_id',
      groupId: 'any_group_id',
      addedBy: 'any_user_id',
    });
  });
});
