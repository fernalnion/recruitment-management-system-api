import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppliedJob } from './applied-job.entity';

export interface ICommentBase {
  title: string;
  description: string;
  appliedJobid: number;
}

export interface IComment extends ICommentBase {
  id: number;
}

@Entity()
export class Comment implements IComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => AppliedJob, (appliedJob) => appliedJob.id)
  appliedJobid: number;
}
