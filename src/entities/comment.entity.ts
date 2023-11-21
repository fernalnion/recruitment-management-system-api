import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppliedJob } from './applied-job.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => AppliedJob, (appliedJob) => appliedJob.comments)
  appliedJob: AppliedJob;
}
