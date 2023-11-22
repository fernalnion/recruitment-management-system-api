import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Department, IDepartment } from './department.entity';

export interface IJobBase {
  title: string;
  description: string;
  departmentid: IDepartment;
  openings: number;
  isActive: boolean;
}

export interface IJob extends IJobBase {
  id: number;
}

@Entity()
export class Job implements IJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Department, (department) => department.id)
  departmentid: IDepartment;

  @Column({ type: 'int' })
  openings: number;

  @Column({ default: false })
  isActive: boolean;
}
