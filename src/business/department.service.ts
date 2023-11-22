import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department, IDepartment } from 'src/entities/department.entity';
import {
  DepartmentAddRequest,
  DepartmentUpdateRequest,
} from 'src/models/Department';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  findAll = (): Promise<IDepartment[]> => {
    return this.departmentRepository.find();
  };

  findByName = (name: string): Promise<IDepartment | null> => {
    return this.departmentRepository.findOne({ where: { name } });
  };

  findOne = (id: number): Promise<IDepartment | null> => {
    return this.departmentRepository.findOne({ where: { id } });
  };

  create = (departmentData: DepartmentAddRequest): Promise<IDepartment> => {
    const department = this.departmentRepository.create(departmentData);
    return this.departmentRepository.save(department);
  };

  update = async (
    id: number,
    departmentData: Partial<DepartmentUpdateRequest>,
  ): Promise<IDepartment | null> => {
    await this.departmentRepository.update(id, departmentData);
    return this.departmentRepository.findOne({ where: { id } });
  };

  remove = async (id: number): Promise<void> => {
    await this.departmentRepository.delete(id);
  };
}
