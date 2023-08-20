import { FindProtectedGroupService } from 'src/modules/group/services/findProtectedGroup.service';
import { FileInputRepository } from '../repositories/fileInput.repository';
import { ProfileRepository } from '../repositories/profile.repository';
import { QueueRepository } from '../repositories/queue.repository';
import { SummaryRepository } from '../repositories/summary.repository';
import { SummaryStoreHandler } from './store.handler';
import { AddSummaryToGroupService } from 'src/modules/group/services/addSummaryToGroup.service';
import { FileInputType, QueueStatus, SummaryStatus } from '../enums';

describe('Store Summary Handler', () => {
  let sut = <SummaryStoreHandler>{};
  let summaryRepository = <SummaryRepository>{};
  let profileRepository = <ProfileRepository>{};
  let queueRepository = <QueueRepository>{};
  let fileInputRepository = <FileInputRepository>{};
  let findProtectedGroup = <FindProtectedGroupService>{};
  let addSummaryToGroup = <AddSummaryToGroupService>{};

  beforeEach(() => {
    summaryRepository = {
      store: jest.fn().mockResolvedValue({
        id: 'any_id',
        title: 'any_title',
        description: 'any_description',
        fileInputType: 'any_file_input_type',
        status: SummaryStatus.PROCESSING,
        createdBy: 'any_user_id',
      }),
    } as any;

    profileRepository = {
      store: jest.fn().mockResolvedValue({
        id: 'any_id',
        grade: 'any_grade',
        subject: 'any_subject',
        summaryId: 'any_summary_id',
        mode: 'any_mode',
      }),
    } as any;

    queueRepository = {
      store: jest.fn().mockResolvedValue({
        id: 'any_id',
        summaryId: 'any_summary_id',
        status: QueueStatus.PENDING,
        retries: 0,
      }),
    } as any;

    fileInputRepository = {
      store: jest.fn().mockResolvedValue({
        id: 'any_id',
        summaryId: 'any_summary_id',
        publicUrl: 'any_public_url',
        createdBy: 'any_user_id',
        type: 'any_type',
      }),
    } as any;

    findProtectedGroup = {
      execute: jest.fn().mockResolvedValue({
        groupId: 'protected_group_id',
      }),
    } as any;

    addSummaryToGroup = {
      execute: jest.fn().mockResolvedValue({
        id: 'any_id',
        title: 'any_title',
        description: 'any_description',
        fileInputType: 'any_file_input_type',
        status: 'any_status',
        createdBy: 'any_user_id',
      }),
    } as any;

    sut = new SummaryStoreHandler(
      summaryRepository,
      profileRepository,
      queueRepository,
      fileInputRepository,
      findProtectedGroup,
      addSummaryToGroup,
    );
  });

  it('should store summary', async () => {
    await sut.execute(
      {
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
      },
      {
        title: 'any_title',
        description: 'any_description',
        grade: 'any_grade',
        subject: 'any_subject',
        mode: 'any_mode',
        link: 'any_link',
      },
    );

    expect(summaryRepository.store).toHaveBeenCalledWith({
      id: expect.any(String),
      title: 'any_title',
      description: 'any_description',
      fileInputType: FileInputType.LINK,
      status: SummaryStatus.PROCESSING,
      createdBy: 'any_user_id',
    });
  });

  it('should store profile', async () => {
    await sut.execute(
      {
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
      },
      {
        title: 'any_title',
        description: 'any_description',
        grade: 'any_grade',
        subject: 'any_subject',
        mode: 'any_mode',
        link: 'any_link',
      },
    );

    expect(profileRepository.store).toHaveBeenCalledWith({
      id: expect.any(String),
      grade: 'any_grade',
      subject: 'any_subject',
      summaryId: 'any_id',
      mode: 'any_mode',
    });
  });

  it('should store file input', async () => {
    await sut.execute(
      {
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
      },
      {
        title: 'any_title',
        description: 'any_description',
        grade: 'any_grade',
        subject: 'any_subject',
        mode: 'any_mode',
        link: 'any_link',
      },
    );

    expect(fileInputRepository.store).toHaveBeenCalledWith({
      id: expect.any(String),
      summaryId: 'any_id',
      publicUrl: 'any_link',
      createdBy: 'any_user_id',
      type: FileInputType.LINK,
    });
  });

  it('should store queue', async () => {
    await sut.execute(
      {
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
      },
      {
        title: 'any_title',
        description: 'any_description',
        grade: 'any_grade',
        subject: 'any_subject',
        mode: 'any_mode',
        link: 'any_link',
      },
    );

    expect(queueRepository.store).toHaveBeenCalledWith({
      id: expect.any(String),
      summaryId: 'any_id',
      retries: 0,
      maxRetries: 3,
      status: QueueStatus.PENDING,
    });
  });

  it('should resolve group id', async () => {
    await sut.execute(
      {
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
      },
      {
        title: 'any_title',
        description: 'any_description',
        grade: 'any_grade',
        subject: 'any_subject',
        mode: 'any_mode',
        link: 'any_link',
      },
    );

    expect(findProtectedGroup.execute).toHaveBeenCalledWith('any_user_id');
    expect(addSummaryToGroup.execute).toHaveBeenCalledWith(
      'any_id',
      'protected_group_id',
      'any_user_id',
    );
  });

  it('should resolve group id from dto', async () => {
    await sut.execute(
      {
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
      },
      {
        title: 'any_title',
        description: 'any_description',
        grade: 'any_grade',
        subject: 'any_subject',
        mode: 'any_mode',
        link: 'any_link',
        groupId: 'any_group_id',
      },
    );

    expect(findProtectedGroup.execute).not.toHaveBeenCalled();
    expect(addSummaryToGroup.execute).toHaveBeenCalledWith(
      'any_id',
      'any_group_id',
      'any_user_id',
    );
  });

  it('should return summary', async () => {
    const summary = await sut.execute(
      {
        id: 'any_user_id',
        name: 'any_name',
        email: 'any_email',
      },
      {
        title: 'any_title',
        description: 'any_description',
        grade: 'any_grade',
        subject: 'any_subject',
        mode: 'any_mode',
        link: 'any_link',
      },
    );

    expect(summary).toEqual({
      id: 'any_id',
      title: 'any_title',
      description: 'any_description',
      fileInputType: 'any_file_input_type',
      status: SummaryStatus.PROCESSING,
      createdBy: 'any_user_id',
    });
  });
});
