import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IRole, IRoleBase } from 'src/schemas/role.schema';
import Mongoose from 'mongoose';

export class RoleAddRequest implements IRoleBase {
  @ApiProperty({ type: Boolean })
  name: string = '';

  @ApiPropertyOptional({ type: Boolean })
  isDefault?: boolean;
}

export class RoleUpdateRequest extends RoleAddRequest implements IRoleBase {}

export class RoleBaseResponse extends RoleAddRequest implements IRole {
  @ApiPropertyOptional({ type: () => Mongoose.Schema.Types.ObjectId })
  _id?: Mongoose.Schema.Types.ObjectId;
}

export class RoleResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => RoleBaseResponse })
  data: RoleBaseResponse = new RoleBaseResponse();
}

export class RolesResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => [RoleBaseResponse] })
  data: RoleBaseResponse[] = [new RoleBaseResponse()];
}
