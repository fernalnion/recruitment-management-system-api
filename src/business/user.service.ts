import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll = (): Promise<User[]> => {
    return this.userRepository.find({
      relations: {
        role: true,
      },
    });
  };

  findOne = (id: number): Promise<User | null> => {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        role: true,
      },
    });
  };

  create = (userData: Partial<User>): Promise<User> => {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  };

  update = async (
    id: number,
    userData: Partial<User>,
  ): Promise<User | null> => {
    await this.userRepository.update(id, userData);
    return this.findOne(id);
  };

  remove = async (id: number): Promise<void> => {
    await this.userRepository.delete(id);
  };

  findByUsername = (username: string): Promise<User | null> => {
    return this.userRepository.findOne({
      where: { username },
      relations: {
        role: true,
      },
    });
  };
}
