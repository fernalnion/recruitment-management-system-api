import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IUser, IUserBase } from 'src/entities/user.entity';
import { DepartmentBaseRespose } from './Department';
import { RoleBaseRespose } from './Role';

class UserBase implements IUserBase {
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

  @ApiPropertyOptional({ type: Date })
  dob?: Date;

  @ApiProperty({ type: Number })
  departmentid: number = 0;

  @ApiProperty({ type: Number })
  roleid: number = 0;
}

export class UserBaseResponse extends UserBase implements IUser {
  @ApiProperty({ type: Number })
  id: number = 0;

  @ApiProperty({ type: Boolean })
  isVerified: boolean = false;

  @ApiProperty({ type: Boolean })
  isActive: boolean = false;

  @ApiProperty({ type: () => DepartmentBaseRespose })
  department: DepartmentBaseRespose = new DepartmentBaseRespose();

  @ApiProperty({ type: () => RoleBaseRespose })
  role: RoleBaseRespose = new RoleBaseRespose();
}

export class UsersResponse {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => [UserBaseResponse] })
  data: UserBaseResponse[] = [new UserBaseResponse()];
}

export class UserResponse {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => UserBaseResponse })
  data: UserBaseResponse = new UserBaseResponse();
}

export class UserAddRequest extends PartialType(
  OmitType(UserBaseResponse, [
    'id',
    'isVerified',
    'isActive',
    'role',
    'department',
  ] as const),
) {}
export class UserUpdateRequest extends UserAddRequest {}
