import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface ICommentBase {
  title: string;
  description: string;
  application: Mongoose.Schema.Types.ObjectId;
  applicationevent: Mongoose.Schema.Types.ObjectId;
}

export interface IComment extends ICommentBase {
  _id?: Mongoose.Schema.Types.ObjectId;
}

@Schema()
export class Comment implements IComment {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  })
  application: Mongoose.Schema.Types.ObjectId;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'ApplicationEvent',
    required: true,
  })
  applicationevent: Mongoose.Schema.Types.ObjectId;
}

export type CommentDocument = Mongoose.HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
