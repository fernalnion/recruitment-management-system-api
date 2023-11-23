import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUser, IUserBase } from 'src/schemas/user.schema';
import Mongoose from 'mongoose';

export class UserAddRequest implements IUserBase {
  @ApiProperty({ type: String })
  username: string = '';

  @ApiProperty({ type: String })
  password: string = '';

  @ApiProperty({ type: String })
  email: string = '';

  @ApiProperty({ type: String })
  mobile: string = '';

  @ApiProperty({ type: String })
  firstname: string = '';

  @ApiPropertyOptional({ type: String })
  lastname?: string;

  @ApiProperty({ type: String })
  department: string = '';

  @ApiProperty({ type: String })
  role: string = new Mongoose.Types.ObjectId().toString();

  @ApiPropertyOptional({ type: String })
  dob?: Date;
}

export class UserUpdateRequest extends UserAddRequest implements IUserBase {
  @ApiPropertyOptional({ type: Boolean })
  isVerified?: boolean = false;

  @ApiPropertyOptional({ type: Boolean })
  isActive?: boolean = false;
}

export class UserBaseResponse extends UserAddRequest implements IUser {
  @ApiPropertyOptional({ type: () => Mongoose.Schema.Types.ObjectId })
  _id?: Mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: Boolean })
  isVerified: boolean = false;

  @ApiProperty({ type: Boolean })
  isActive: boolean = false;
}

export class UserResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => UserBaseResponse })
  data: UserBaseResponse = new UserBaseResponse();
}

export class UsersResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => [UserBaseResponse] })
  data: UserBaseResponse[] = [new UserBaseResponse()];
}
