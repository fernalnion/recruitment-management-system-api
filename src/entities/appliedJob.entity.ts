import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobEntity } from './job.entity';
import { ApplicantEntity } from './applicant.entity';
import { ScheduleEntity } from './schedules.entiry';
import { CommentsEntity } from './comments.entity';
import { JOB_APPLIED_STATUS_ENUM } from 'src/enums/status.enum';

@Entity()
export class AppliedJobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobEntity, (job) => job.appliedJobs, { cascade: true })
  job: JobEntity;

  @ManyToOne(() => ApplicantEntity, (applicant) => applicant.appliedJobs, {
    cascade: true,
  })
  applicant: ApplicantEntity;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.appliedJob, {
    cascade: true,
  })
  schedule: ScheduleEntity[];

  @OneToMany(() => CommentsEntity, (comment) => comment.appliedJob, {
    cascade: true,
  })
  comments: CommentsEntity[];

  @Column({
    type: 'enum',
    enum: JOB_APPLIED_STATUS_ENUM,
    default: JOB_APPLIED_STATUS_ENUM.YET_TO_SCREEN,
  })
  status: JOB_APPLIED_STATUS_ENUM;
}
