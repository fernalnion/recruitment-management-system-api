import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Department,
  IDepartment,
  IDepartmentBase,
} from 'src/schemas/department.schema';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private readonly departmentModel: Model<Department>,
  ) {}

  findAll = (): Promise<IDepartment[]> => {
    return this.departmentModel.find();
  };

  findByName = (name: string): Promise<IDepartment | null> => {
    return this.departmentModel.findOne({ name });
  };

  findOne = (_id: string): Promise<IDepartment | null> => {
    return this.departmentModel.findOne({ _id });
  };

  create = (data: IDepartmentBase): Promise<IDepartment> => {
    const department = new this.departmentModel(data);
    return department.save();
  };

  update = async (
    _id: string,
    data: Partial<IDepartmentBase>,
  ): Promise<IDepartment | null> => {
    return this.departmentModel.findOneAndUpdate({ _id }, data);
  };

  remove = async (_id: string): Promise<void> => {
    await this.departmentModel.deleteOne({ _id });
  };
}
