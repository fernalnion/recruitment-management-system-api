import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface IResumeBase {
  filepath: string;
  applicant: string;
  skills: string[];
}

export interface IResume extends IResumeBase {
  _id?: string | Mongoose.Schema.Types.ObjectId | any;
}

@Schema()
export class Resume implements IResume {
  @Prop({ required: true })
  filepath: string;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Applicant',
    required: true,
    unique: true,
  })
  applicant: string;

  @Prop({ type: [{ type: String }] })
  skills: string[];
}

export type ResumeDocument = Mongoose.HydratedDocument<Resume>;
export const ResumeSchema = SchemaFactory.createForClass(Resume);
