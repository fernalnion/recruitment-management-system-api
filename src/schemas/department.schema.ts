import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import Mongoose from 'mongoose';

export interface IDepartmentBase {
  name: string;
  isDefault?: boolean;
}

export interface IDepartment extends IDepartmentBase {
  _id?: string | Mongoose.Schema.Types.ObjectId | any;
}

@Schema()
export class Department implements IDepartment {
  @Prop({ unique: true })
  name: string;

  @Prop({ default: false })
  isDefault: boolean;
}

export type DepartmentDocument = Mongoose.HydratedDocument<Department>;
export const DepartmentSchema = SchemaFactory.createForClass(Department);
