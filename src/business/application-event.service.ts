import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ApplicationEvent,
  IApplicationEvent,
  IApplicationEventBase,
} from 'src/schemas/application-event.schema';

@Injectable()
export class ApplicationEventService {
  constructor(
    @InjectModel(ApplicationEvent.name)
    private readonly applicationEventModel: Model<ApplicationEvent>,
  ) {}

  async findAll(): Promise<IApplicationEvent[]> {
    return this.applicationEventModel.find();
  }

  async findOne(_id: string): Promise<IApplicationEvent | null> {
    return this.applicationEventModel.findOne({ _id });
  }

  async create(data: IApplicationEventBase): Promise<IApplicationEvent> {
    const applicationevent = new this.applicationEventModel(data);
    return applicationevent.save();
  }

  async update(
    _id: string,
    data: Partial<IApplicationEvent>,
  ): Promise<IApplicationEvent | null> {
    return this.applicationEventModel.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: string): Promise<void> {
    await this.applicationEventModel.deleteOne({ _id });
  }
}
