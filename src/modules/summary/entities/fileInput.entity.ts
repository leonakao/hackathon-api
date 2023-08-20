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

  @Column()
  summaryId: string;

  @Column()
  type: FileInputType;

  @Column()
  publicUrl: string;

  @Column()
  name?: string;

  @Column()
  format?: string;

  @Column()
  size?: string;

  @Column()
  createdBy: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
