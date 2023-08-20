import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileInputType } from '../enums';
import { SummaryStatus } from '../enums/summaryStatus.enum';
import { Profile } from './profile.entity';
import { FileInput } from './fileInput.entity';

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

  @OneToOne(() => Profile, (profile) => profile.summaryId)
  profile: Profile;

  @OneToOne(() => FileInput, (fileInput) => fileInput.summaryId)
  fileInput: FileInput;
}
