import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface IResumeBase {
  filepath: string;
  applicant: Mongoose.Schema.Types.ObjectId;
  skills: string[];
}

export interface IResume extends IResumeBase {
  _id?: Mongoose.Schema.Types.ObjectId;
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
  applicant: Mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: String }] })
  skills: string[];
}

export type ResumeDocument = Mongoose.HydratedDocument<Resume>;
export const ResumeSchema = SchemaFactory.createForClass(Resume);
