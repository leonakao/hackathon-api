import { Injectable } from '@nestjs/common';
import { Summary } from '../entities/summary.entity';
import { SummaryRepository } from '../repositories/summary.repository';
import { ProfileRepository } from '../repositories/profile.repository';
import { FileInputRepository } from '../repositories/fileInput.repository';
import { randomUUID } from 'crypto';
import { FileInputType } from '../enums';
import { SummaryStatus } from '../enums/summaryStatus.enum';
import { AuthenticatedUser } from 'src/modules/auth/services/signIn.service';

export interface SummaryStoreDto {
  title: string;
  description: string;
  grade: string;
  subject: string;
  file?: File;
  link?: string;
  groupId?: string;
}

@Injectable()
export class SummaryStoreHandler {
  constructor(
    private readonly summaryRepository: SummaryRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly fileInputRepository: FileInputRepository,
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

    return summary;
  }
}
