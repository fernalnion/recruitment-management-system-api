import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppliedJob } from './applied-job.entity';

export interface IJobEventBase {
  isCanceled: boolean;
  timestamp: Date;
  appliedjobid: number;
}

export interface IJobEvent extends IJobEventBase {
  id: number;
}

@Entity()
export class JobEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isCanceled: boolean;

  @Column('datetime')
  timestamp: Date;

  @ManyToOne(() => AppliedJob, (appliedJob) => appliedJob.id)
  appliedjobid: number;
}
