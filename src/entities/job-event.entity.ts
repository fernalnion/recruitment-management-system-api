import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppliedJob } from './applied-job.entity';
import { User } from './user.entity';

@Entity()
export class JobEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isCanceled: boolean;

  @Column('datetime')
  timestamp: Date;

  @ManyToOne(() => AppliedJob, (appliedJob) => appliedJob.jobEvents)
  appliedJob: AppliedJob;

  @ManyToMany(() => User, (user) => user.jobEvents)
  users: User[];
}
