import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  document?: string;

  @Column()
  phone?: string;

  @Column()
  age?: number;

  @Column()
  gender?: Gender;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt?: Date;
}
