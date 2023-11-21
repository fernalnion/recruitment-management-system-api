import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppliedJob } from './applied-job.entity';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  firstname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column({ default: 0 })
  experienceInYears: number;

  @Column()
  profileImagePath: string;

  @Column()
  resumePath: string;

  @OneToMany(() => AppliedJob, (appliedJob) => appliedJob.job)
  appliedJobs: AppliedJob[];
}
