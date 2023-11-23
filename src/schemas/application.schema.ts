import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';
import { JOB_APPLIED_STATUS_ENUM } from 'src/enums/status.enum';

export interface IApplicationBase {
  status: JOB_APPLIED_STATUS_ENUM;
  appliedAt: Date;
  applicant: string;
  job: string;
}

export interface IApplication extends IApplicationBase {
  _id?: string | Mongoose.Schema.Types.ObjectId | any;
}

@Schema()
export class Application implements IApplication {
  @Prop({
    type: String,
    enum: JOB_APPLIED_STATUS_ENUM,
    default: JOB_APPLIED_STATUS_ENUM.YET_TO_SCREEN,
  })
  status: JOB_APPLIED_STATUS_ENUM;

  @Prop({ type: Date, default: Date.now })
  appliedAt: Date;

  @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  applicant: string;

  @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: 'Job', required: true })
  job: string;
}

export type ApplicationDocument = Mongoose.HydratedDocument<Application>;
export const ApplicationSchema = SchemaFactory.createForClass(Application);
