import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser, User } from './user.entity';
export interface IRoleBase {
  name: string;
  isDefault?: boolean;
}

export interface IRole extends IRoleBase {
  id: number;
  users?: IUser[];
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: false })
  isDefault: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: IUser[];
}
