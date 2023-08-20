import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileInputType } from '../enums';
import { SummaryStatus } from '../enums/summaryStatus.enum';

@Entity('summaries')
export class Summary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  tags?: string;

  @Column({ name: 'file_input_type' })
  fileInputType: FileInputType;

  @Column()
  status: SummaryStatus;

  @Column({ name: 'file_path' })
  filePath?: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
