import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface ICommentBase {
  title: string;
  description: string;
  application: string;
  applicationevent: string;
}

export interface IComment extends ICommentBase {
  _id?: string | Mongoose.Schema.Types.ObjectId | any;
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
  application: string;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'ApplicationEvent',
    required: true,
  })
  applicationevent: string;
}

export type CommentDocument = Mongoose.HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
