import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department, IDepartment } from './department.entity';
import { IRole, Role } from './role.entity';

export interface IUserBase {
  username: string;
  password: string;
  email: string;
  mobile: string;
  firstname: string;
  lastname?: string;
  departmentid: number;
  roleid: number;
  dob?: Date;
}

export interface IUser extends IUserBase {
  id: number;
  department: IDepartment;
  role: IRole;
  isVerified: boolean;
  isActive: boolean;
}

@Entity()
export class User implements IUser {
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
  @JoinColumn({ name: 'departmentid' })
  department: IDepartment;

  @Column({ nullable: true })
  departmentid: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'roleid' })
  role: IRole;

  @Column({ nullable: true })
  roleid: number;

  @Column('date')
  dob: Date;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isActive: boolean;
}
