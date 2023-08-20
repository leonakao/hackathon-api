import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('group_users')
export class GroupUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  summaryId: string;

  @Column()
  userId: string;

  @Column()
  addedBy: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
