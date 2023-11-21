import { JOB_APPLIED_STATUS_ENUM } from 'src/enums/status.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applicant } from './applicant.entity';
import { Comment } from './comment.entity';
import { Job } from './job.entity';
import { JobEvent } from './job-event.entity';

@Entity()
export class AppliedJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: JOB_APPLIED_STATUS_ENUM,
    default: JOB_APPLIED_STATUS_ENUM.YET_TO_SCREEN,
  })
  status: JOB_APPLIED_STATUS_ENUM;

  @ManyToOne(() => Job, (job) => job.appliedJobs)
  job: Job;

  @ManyToOne(() => Applicant, (applicant) => applicant.appliedJobs)
  applicant: Applicant;

  @OneToMany(() => JobEvent, (scheduler) => scheduler.appliedJob)
  jobEvents: JobEvent[];

  @OneToMany(() => Comment, (comment) => comment.appliedJob)
  comments: Comment[];
}
