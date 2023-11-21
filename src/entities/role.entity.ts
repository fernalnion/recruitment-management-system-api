import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: false })
  isDefault: boolean;
}
