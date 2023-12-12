import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Applicant,
  IApplicant,
  IApplicantBase,
} from 'src/schemas/applicant.schema';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectModel(Applicant.name)
    private readonly applicantModel: Model<Applicant>,
  ) {}

  findAll = (): Promise<IApplicant[]> => {
    return this.applicantModel.find({});
  };

  findOne = (_id: string): Promise<IApplicant | null> => {
    return this.applicantModel.findOne({ _id });
  };

  create = (data: IApplicantBase): Promise<IApplicant> => {
    const applicant = new this.applicantModel(data);
    return applicant.save();
  };

  update = async (
    _id: string,
    data: Partial<IApplicant>,
  ): Promise<IApplicant | null> => {
    return this.applicantModel.findByIdAndUpdate({ _id }, data);
  };

  remove = async (_id: string): Promise<void> => {
    await this.applicantModel.deleteOne({ _id });
  };
}
