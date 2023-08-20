import { Injectable } from '@nestjs/common';
import { Summary } from '../entities/summary.entity';
import { SummaryRepository } from '../repositories/summary.repository';
import { ProfileRepository } from '../repositories/profile.repository';
import { FileInputRepository } from '../repositories/fileInput.repository';
import { randomUUID } from 'crypto';
import { FileInputType, QueueStatus } from '../enums';
import { SummaryStatus } from '../enums/summaryStatus.enum';
import { AuthenticatedUser } from 'src/modules/auth/services/signIn.service';
import { FindProtectedGroupService } from 'src/modules/group/services/findProtectedGroup.service';
import { AddSummaryToGroupService } from 'src/modules/group/services/addSummaryToGroup.service';
import { QueueRepository } from '../repositories/queue.repository';

export interface SummaryStoreDto {
  title: string;
  grade: string;
  subject: string;
  description?: string;
  file?: File;
  link?: string;
  groupId?: string;
}

@Injectable()
export class SummaryStoreHandler {
  private INITIAL_RETRIES = 0;
  private MAX_RETRIES = 3;

  constructor(
    private readonly summaryRepository: SummaryRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly queueRepository: QueueRepository,
    private readonly fileInputRepository: FileInputRepository,
    private readonly findProtectedGroup: FindProtectedGroupService,
    private readonly addSummaryToGroup: AddSummaryToGroupService,
  ) {}

  async execute(
    user: AuthenticatedUser,
    data: SummaryStoreDto,
  ): Promise<Summary> {
    const inputType = data.file ? FileInputType.FILE : FileInputType.LINK;

    const summary = await this.summaryRepository.store({
      id: randomUUID(),
      title: data.title,
      description: data.description,
      fileInputType: inputType,
      status: SummaryStatus.PROCESSING,
      createdBy: user.id,
    });

    await this.profileRepository.store({
      id: randomUUID(),
      grade: data.grade,
      subject: data.subject,
      summaryId: summary.id,
      hasDisability: true,
    });

    await this.fileInputRepository.store({
      id: randomUUID(),
      summaryId: summary.id,
      publicUrl: data.link,
      createdBy: user.id,
      type: inputType,
    });

    await this.queueRepository.store({
      id: randomUUID(),
      summaryId: summary.id,
      retries: this.INITIAL_RETRIES,
      maxRetries: this.MAX_RETRIES,
      status: QueueStatus.PENDING,
    });

    const groupId = await this.resolveGroupId(data, user.id);

    await this.addSummaryToGroup.execute(summary.id, groupId, user.id);

    return summary;
  }

  private async resolveGroupId(data: SummaryStoreDto, userId: string) {
    if (data.groupId) {
      return data.groupId;
    }

    const { groupId } = await this.findProtectedGroup.execute(userId);

    return groupId;
  }
}
