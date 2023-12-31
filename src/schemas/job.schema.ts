import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface IJobBase {
  title: string;
  description: string;
  department: Mongoose.Schema.Types.ObjectId;
  openings: number;
  skills: string[];
  postedAt: Date;
  isActive: boolean;
}

export interface IJob extends IJobBase {
  _id?: Mongoose.Schema.Types.ObjectId;
}

@Schema()
export class Job implements IJob {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'department',
    required: true,
  })
  department: Mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, min: 1 })
  openings: number;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ type: [{ type: String }] })
  skills: string[];

  @Prop({ type: Date, required: true })
  postedAt: Date;
}

export type JobDocument = Mongoose.HydratedDocument<Job>;
export const JobSchema = SchemaFactory.createForClass(Job);
