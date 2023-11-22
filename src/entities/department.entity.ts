import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser, User } from './user.entity';

export interface IDepartmentBase {
  name: string;
  isDefault: boolean;
}

export interface IDepartment extends IDepartmentBase {
  id: number;
  users?: IUser[];
}
@Entity()
export class Department implements IDepartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ default: false })
  isDefault: boolean;

  @OneToMany(() => User, (user) => user.department)
  users: IUser[];
}
