import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppliedJobEntity } from './appliedJob.entity';
import { DepartmentEntity } from './department.entity';

@Entity()
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => DepartmentEntity, (department) => department.job, {
    cascade: true,
  })
  department: string;

  @Column({ type: 'int' })
  openings: number;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => AppliedJobEntity, (appliedJob) => appliedJob.job, {
    cascade: true,
  })
  appliedJobs: AppliedJobEntity[];
}
