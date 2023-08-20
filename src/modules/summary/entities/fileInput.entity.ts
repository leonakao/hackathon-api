import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileInputType } from '../enums';

@Entity('file_inputs')
export class FileInput {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'summary_id' })
  summaryId: string;

  @Column()
  type: FileInputType;

  @Column({ name: 'public_url' })
  publicUrl: string;

  @Column()
  name?: string;

  @Column()
  format?: string;

  @Column()
  size?: string;

  @Column({ name: 'created_by' })
  createdBy: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
