import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface IApplicantBase {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  profilepath: string;
}
export interface IApplicant extends IApplicantBase {
  _id?: string | Mongoose.Schema.Types.ObjectId | any;
}

@Schema()
export class Applicant implements IApplicant {
  @Prop({ required: true, length: 100 })
  firstname: string;

  @Prop({ length: 100 })
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  mobile: string;

  @Prop({ default: 0 })
  experienceInYears: number;

  @Prop()
  profilepath: string;
}

export type ApplicantDocument = Mongoose.HydratedDocument<Applicant>;
export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
