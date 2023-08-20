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

  @Column()
  summaryId: string;

  @Column()
  groupId: string;

  @Column()
  addedBy: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
