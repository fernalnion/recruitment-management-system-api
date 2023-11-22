import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Department } from './department.entity';
import { Role } from './role.entity';
import { JobEvent } from './job-event.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  mobile: string;

  @Column({ nullable: false })
  firstname: string;

  @Column()
  lastname: string;

  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column('date')
  dob: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isActive: boolean;

  @ManyToMany(() => JobEvent, (jobEvent) => jobEvent.users)
  jobEvents: JobEvent[];
}
