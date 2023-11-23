import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IJob, IJobBase, Job } from 'src/schemas/job.schema';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: Model<Job>,
  ) {}

  async findAll(): Promise<IJob[]> {
    return this.jobModel.find();
  }

  async findOne(_id: string): Promise<IJob | null> {
    return this.jobModel.findOne({ _id });
  }

  async create(data: IJobBase): Promise<IJob> {
    const job = new this.jobModel(data);
    return job.save();
  }

  async update(_id: string, data: Partial<IJob>): Promise<IJob | null> {
    return this.jobModel.findByIdAndUpdate({ _id }, data);
  }

  async remove(_id: string): Promise<void> {
    await this.jobModel.deleteOne({ _id });
  }
}
