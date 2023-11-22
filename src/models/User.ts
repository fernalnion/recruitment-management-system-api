import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

class UserBase {
  @ApiProperty({ type: String })
  username: string = '';

  @ApiProperty({ type: String })
  email: string = '';

  @ApiProperty({ type: String })
  mobile: string = '';

  @ApiProperty({ type: String })
  firstname: string = '';

  @ApiProperty({ type: String })
  lastname: string = '';

  @ApiProperty({ type: String })
  department: string = '';

  @ApiProperty({ type: Number })
  role: number = 0;

  @ApiPropertyOptional({ type: String })
  dob?: string;
}

export class UserBaseResponse extends UserBase {
  @ApiProperty({ type: Number })
  id: number = 0;

  @ApiProperty({ type: Boolean })
  isVerified: boolean = false;

  @ApiProperty({ type: Boolean })
  isActive: boolean = false;
}

export class UsersResponse {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => [User] })
  data: User[] = [];
}

export class UserResponse {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => User })
  data: User = new User();
}

export class UserAddRequest extends OmitType(User, [
  'id',
  'hashPassword',
  'isVerified',
  'isActive',
] as const) {}
export class UserUpdateRequest extends OmitType(User, ['id'] as const) {}
