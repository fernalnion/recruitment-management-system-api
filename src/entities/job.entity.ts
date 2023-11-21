import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppliedJob } from './applied-job.entity';
import { Department } from './department.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Department, (department) => department.jobs)
  department: string;

  @Column({ type: 'int' })
  openings: number;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => AppliedJob, (appliedJob) => appliedJob.job)
  appliedJobs: AppliedJob[];
}
