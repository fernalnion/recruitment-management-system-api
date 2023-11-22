import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IApplicantBase {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  experienceInYears: number;
  profileImagePath: string;
  resumePath: string;
}
export interface IApplicant extends IApplicantBase {
  id: number;
}

@Entity()
export class Applicant implements IApplicant {
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
}
