import { JOB_APPLIED_STATUS_ENUM } from 'src/enums/status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Applicant } from './applicant.entity';
import { Job } from './job.entity';

export interface IAppliedJobBase {
  status: JOB_APPLIED_STATUS_ENUM;
  jobid: number;
  applicantid: number;
}

export interface IAppliedJob extends IAppliedJobBase {
  id: number;
}
@Entity()
export class AppliedJob implements IAppliedJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: JOB_APPLIED_STATUS_ENUM,
    default: JOB_APPLIED_STATUS_ENUM.YET_TO_SCREEN,
  })
  status: JOB_APPLIED_STATUS_ENUM;

  @ManyToOne(() => Job, (job) => job.id)
  jobid: number;

  @ManyToOne(() => Applicant, (applicant) => applicant.id)
  applicantid: number;
}
