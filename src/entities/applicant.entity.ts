import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppliedJobEntity } from './appliedJob.entity';

@Entity()
export class ApplicantEntity {
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

  @OneToMany(() => AppliedJobEntity, (appliedJob) => appliedJob.job, {
    cascade: true,
  })
  appliedJobs: AppliedJobEntity[];
}
