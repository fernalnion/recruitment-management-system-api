import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole, IRoleBase, Role } from 'src/schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  findAll = (): Promise<IRole[]> => {
    return this.roleModel.find();
  };

  findByName = (name: string): Promise<IRole | null> => {
    return this.roleModel.findOne({ name });
  };

  findOne = (_id: string): Promise<IRole | null> => {
    return this.roleModel.findOne({ _id });
  };

  create = (data: IRoleBase): Promise<IRole> => {
    const role = new this.roleModel(data);
    return role.save();
  };

  update = async (
    _id: string,
    data: Partial<IRoleBase>,
  ): Promise<IRole | null> => {
    return await this.roleModel.findByIdAndUpdate({ _id }, data);
  };

  remove = async (_id: string): Promise<void> => {
    await this.roleModel.deleteOne({ _id });
  };
}
