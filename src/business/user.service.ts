import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser, User } from 'src/entities/user.entity';
import { UserAddRequest, UserUpdateRequest } from 'src/models/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll = (): Promise<IUser[]> => {
    return this.userRepository.find({ relations: ['role', 'department'] });
  };

  findOne = (id: number): Promise<IUser | null> => {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role', 'department'],
    });
  };

  create = (
    userData: UserAddRequest & { isActive?: boolean; isVerified?: boolean },
  ): Promise<User> => {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  };

  update = async (
    id: number,
    userData: Partial<UserUpdateRequest> & {
      isActive?: boolean;
      isVerified?: boolean;
    },
  ): Promise<IUser | null> => {
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  };

  remove = async (id: number): Promise<void> => {
    await this.userRepository.delete(id);
  };

  findByUsername = (username: string): Promise<IUser | null> => {
    return this.userRepository.findOne({
      where: { username },
      relations: ['role', 'department'],
    });
  };
}
