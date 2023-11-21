import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JobEntity } from './job.entity';

@Entity()
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: false })
  isDefault: boolean;

  @OneToMany(() => JobEntity, (job) => job.department, {
    cascade: true,
  })
  job: JobEntity;
}
