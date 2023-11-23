import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface IApplicationEventBase {
  isCanceled: boolean;
  appliedAt: Date;
  application: Mongoose.Schema.Types.ObjectId;
}

export interface IApplicationEvent extends IApplicationEventBase {
  _id?: Mongoose.Schema.Types.ObjectId;
}

@Schema()
export class ApplicationEvent implements IApplicationEvent {
  @Prop({ default: false })
  isCanceled: boolean;

  @Prop({ type: Date, required: true })
  appliedAt: Date;

  @Prop({
    type: () => Mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  })
  application: Mongoose.Schema.Types.ObjectId;
}

export type ApplicationEventDocument =
  Mongoose.HydratedDocument<ApplicationEvent>;
export const ApplicationEventSchema =
  SchemaFactory.createForClass(ApplicationEvent);
