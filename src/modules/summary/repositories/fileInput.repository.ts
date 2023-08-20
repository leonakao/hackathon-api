import { StoreEntity } from 'src/shared/types';
import { FileInput } from '../entities/fileInput.entity';

export abstract class FileInputRepository {
  abstract store(fileInput: StoreEntity<FileInput>): Promise<FileInput>;
}
