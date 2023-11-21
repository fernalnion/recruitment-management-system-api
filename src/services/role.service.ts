import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll = (): Promise<Role[]> => {
    return this.roleRepository.find();
  };

  findByName = (name: string): Promise<Role | null> => {
    return this.roleRepository.findOne({ where: { name } });
  };

  findOne = (id: number): Promise<Role | null> => {
    return this.roleRepository.findOne({ where: { id } });
  };

  create = (roleData: Partial<Role>): Promise<Role> => {
    const department = this.roleRepository.create(roleData);
    return this.roleRepository.save(department);
  };

  update = async (
    id: number,
    roleData: Partial<Role>,
  ): Promise<Role | null> => {
    await this.roleRepository.update(id, roleData);
    return this.roleRepository.findOne({ where: { id } });
  };

  remove = async (id: number): Promise<void> => {
    await this.roleRepository.delete(id);
  };
}
