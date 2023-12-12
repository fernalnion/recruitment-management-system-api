import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Application,
  IApplication,
  IApplicationBase,
} from 'src/schemas/application.schema';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
  ) {}

  async findAll(): Promise<IApplication[]> {
    return this.applicationModel.find();
  }

  async findOne(_id: string): Promise<IApplication | null> {
    return this.applicationModel.findOne({ _id });
  }

  async create(data: IApplicationBase): Promise<IApplication> {
    const application = new this.applicationModel(data);
    return application.save();
  }

  async update(
    _id: string,
    data: Partial<IApplication>,
  ): Promise<IApplication | null> {
    return this.applicationModel.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: string): Promise<void> {
    await this.applicationModel.deleteOne({ _id });
  }
}
