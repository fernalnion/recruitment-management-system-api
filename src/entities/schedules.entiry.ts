import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppliedJobEntity } from './appliedJob.entity';
import { UserEntity } from './user.entity';

@Entity()
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  scheduledAt: Date;

  @ManyToOne(() => AppliedJobEntity, (appliedjob) => appliedjob.schedule, {
    cascade: true,
  })
  appliedJob: AppliedJobEntity;

  @OneToMany(() => UserEntity, (user) => user.schedule, {
    cascade: true,
  })
  users: UserEntity[];

  @Column({ default: false })
  isCanceled: boolean;
}
