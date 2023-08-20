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

  @Column()
  fileInputType: FileInputType;

  @Column()
  status: SummaryStatus;

  @Column()
  createdBy: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
