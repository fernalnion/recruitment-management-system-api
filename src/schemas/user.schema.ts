import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface IUserBase {
  username: string;
  password: string;
  email: string;
  mobile: string;
  firstname: string;
  lastname?: string;
  department: string;
  role: string;
  dob?: Date;
}

export interface IUser extends IUserBase {
  _id?: Mongoose.Schema.Types.ObjectId;
  isVerified: boolean;
  isActive: boolean;
}

@Schema()
export class User implements IUser {
  @Prop({ unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  mobile: string;

  @Prop({ required: true })
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'department',
    required: true,
  })
  department: string;

  @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: 'role', required: true })
  role: string;

  @Prop()
  dob: Date;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isActive: boolean;
}

export type UserDocument = Mongoose.HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
