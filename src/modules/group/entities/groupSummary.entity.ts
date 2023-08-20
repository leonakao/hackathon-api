import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('group_summaries')
export class GroupSummary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'summary_id' })
  summaryId: string;

  @Column({ name: 'group_id' })
  groupId: string;

  @Column({ name: 'added_by' })
  addedBy: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
