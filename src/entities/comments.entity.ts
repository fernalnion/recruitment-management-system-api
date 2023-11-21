import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppliedJobEntity } from './appliedJob.entity';

@Entity()
export class CommentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => AppliedJobEntity, (appliedJob) => appliedJob.comments, {
    cascade: true,
  })
  appliedJob: AppliedJobEntity;
}
