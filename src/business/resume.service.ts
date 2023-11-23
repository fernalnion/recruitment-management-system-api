import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResume, IResumeBase, Resume } from 'src/schemas/resume.schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name)
    private readonly resumeModel: Model<Resume>,
  ) {}

  findAll = (): Promise<IResumeBase[]> => {
    return this.resumeModel.find({});
  };

  findOne = (_id: string): Promise<IResume | null> => {
    return this.resumeModel.findOne({ _id });
  };

  create = (data: IResumeBase): Promise<IResume> => {
    const resume = new this.resumeModel(data);
    return resume.save();
  };

  update = async (
    _id: string,
    data: Partial<IResume>,
  ): Promise<IResume | null> => {
    return this.resumeModel.findByIdAndUpdate({ _id }, data);
  };

  remove = async (_id: string): Promise<void> => {
    await this.resumeModel.deleteOne({ _id });
  };
}
