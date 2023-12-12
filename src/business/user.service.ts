import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, IUserBase, User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  findAll = (): Promise<IUser[]> => {
    return this.userModel.find({});
  };

  findOne = (_id: string): Promise<IUser | null> => {
    return this.userModel.findOne({ _id });
  };

  create = (
    data: IUserBase & { isActive?: boolean; isVerified?: boolean },
  ): Promise<IUser> => {
    const user = new this.userModel(data);
    return user.save();
  };

  update = async (
    _id: string,
    data: Partial<IUserBase> & {
      isActive?: boolean;
      isVerified?: boolean;
    },
  ): Promise<IUser | null> => {
    return this.userModel.findByIdAndUpdate({ _id }, data);
  };

  remove = async (_id: string): Promise<void> => {
    await this.userModel.deleteOne({ _id });
  };

  findByUsername = (username: string): Promise<IUser | null> => {
    return this.userModel.findOne({ username });
  };
}
