import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IDepartment, IDepartmentBase } from 'src/schemas/department.schema';
import { RoleBaseResponse } from './RoleDto';

export class DepartmentAddRequest implements IDepartmentBase {
  @ApiProperty({ type: Boolean })
  name: string = '';

  @ApiPropertyOptional({ type: Boolean })
  isDefault?: boolean;
}

export class DepartmentUpdateRequest
  extends DepartmentAddRequest
  implements IDepartmentBase {}

export class DepartmentBaseResponse
  extends DepartmentAddRequest
  implements IDepartment
{
  @ApiPropertyOptional({ type: String })
  _id?: string;
}

export class DepartmentResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => RoleBaseResponse })
  data: RoleBaseResponse = new RoleBaseResponse();
}

export class DepartmentsResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => [RoleBaseResponse] })
  data: RoleBaseResponse[] = [new RoleBaseResponse()];
}
