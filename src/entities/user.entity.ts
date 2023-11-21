import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { DepartmentEntity } from './department.entity';
import { ScheduleEntity } from './schedules.entiry';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  mobile: string;

  @Column({ nullable: false })
  firstname: string;

  @Column()
  lastname: string;

  @OneToOne(() => DepartmentEntity, (department) => department.id, {
    cascade: true,
  })
  @JoinColumn()
  department: string;

  @OneToOne(() => RoleEntity, (role) => role.id, { cascade: true })
  @JoinColumn()
  role: RoleEntity;

  @Column('date')
  dob: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => ScheduleEntity, (schedule) => schedule.users, {
    cascade: true,
  })
  schedule: ScheduleEntity;
}
