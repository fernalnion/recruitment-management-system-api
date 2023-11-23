import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface IRoleBase {
  name: string;
  isDefault?: boolean;
}

export interface IRole extends IRoleBase {
  _id?: string | Mongoose.Schema.Types.ObjectId | any;
}

@Schema()
export class Role implements IRole {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ default: false })
  isDefault: boolean;
}

export type RoleDocument = Mongoose.HydratedDocument<Role>;
export const RoleSchema = SchemaFactory.createForClass(Role);
