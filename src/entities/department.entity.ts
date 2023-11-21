import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './job.entity';
import { User } from './user.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ default: false })
  isDefault: boolean;

  @OneToMany(() => Job, (job) => job.department)
  jobs: Job[];

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
