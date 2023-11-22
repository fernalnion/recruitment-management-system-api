import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRole, Role } from 'src/entities/role.entity';
import { RoleAddRequest, RoleUpdateRequest } from 'src/models/Role';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll = (): Promise<IRole[]> => {
    return this.roleRepository.find();
  };

  findByName = (name: string): Promise<IRole | null> => {
    return this.roleRepository.findOne({ where: { name } });
  };

  findOne = (id: number): Promise<IRole | null> => {
    return this.roleRepository.findOne({ where: { id } });
  };

  create = (roleData: RoleAddRequest): Promise<IRole> => {
    const department = this.roleRepository.create(roleData);
    return this.roleRepository.save(department);
  };

  update = async (
    id: number,
    roleData: Partial<RoleUpdateRequest>,
  ): Promise<IRole | null> => {
    await this.roleRepository.update(id, roleData);
    return this.roleRepository.findOne({ where: { id } });
  };

  remove = async (id: number): Promise<void> => {
    await this.roleRepository.delete(id);
  };
}
