import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface IApplicationEventBase {
  isCanceled: boolean;
  timestamp: Date;
  application: string;
}

export interface IApplicationEvent extends IApplicationEventBase {
  _id?: string | Mongoose.Schema.Types.ObjectId | any;
}

@Schema()
export class ApplicationEvent implements IApplicationEvent {
  @Prop({ default: false })
  isCanceled: boolean;

  @Prop({ type: Date, required: true })
  timestamp: Date;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  })
  application: string;
}

export type ApplicationEventDocument =
  Mongoose.HydratedDocument<ApplicationEvent>;
export const ApplicationEventSchema =
  SchemaFactory.createForClass(ApplicationEvent);
