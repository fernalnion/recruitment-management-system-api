import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  totalExperinceInYear: number;

  @Column()
  resume: string;
}
