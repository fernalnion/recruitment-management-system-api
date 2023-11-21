import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  findAll = (): Promise<Department[]> => {
    return this.departmentRepository.find();
  };

  findByName = (name: string): Promise<Department | null> => {
    return this.departmentRepository.findOne({ where: { name } });
  };

  findOne = (id: number): Promise<Department | null> => {
    return this.departmentRepository.findOne({ where: { id } });
  };

  create = (departmentData: Partial<Department>): Promise<Department> => {
    const department = this.departmentRepository.create(departmentData);
    return this.departmentRepository.save(department);
  };

  update = async (
    id: number,
    departmentData: Partial<Department>,
  ): Promise<Department | null> => {
    await this.departmentRepository.update(id, departmentData);
    return this.departmentRepository.findOne({ where: { id } });
  };

  remove = async (id: number): Promise<void> => {
    await this.departmentRepository.delete(id);
  };
}
