import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column({ default: false })
  protected: boolean;

  @Column()
  createdBy: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
