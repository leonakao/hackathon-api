import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FileInput } from '../../entities/fileInput.entity';
import { FileInputRepository } from '../fileInput.repository';

@Injectable()
export class FileInputTypeOrmRepository extends FileInputRepository {
  private readonly repository: Repository<FileInput>;

  constructor(private readonly dataSource: DataSource) {
    super();

    this.repository = this.dataSource.getRepository(FileInput);
  }

  async store(
    fileInput: Omit<FileInput, 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ) {
    return await this.repository.save(fileInput);
  }
}
