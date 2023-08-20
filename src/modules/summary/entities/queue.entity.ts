import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QueueStatus } from '../enums';

@Entity('summary_queues')
export class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'summary_id' })
  summaryId: string;

  @Column()
  retries: number;

  @Column({ name: 'max_retries' })
  maxRetries: number;

  @Column({ default: QueueStatus.PENDING })
  status: QueueStatus;

  @Column({ name: 'processed_at' })
  processedAt?: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
