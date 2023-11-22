import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IDepartment, IDepartmentBase } from 'src/entities/department.entity';
import { UserBaseResponse } from './User';

class DepartmentBase implements IDepartmentBase {
  @ApiProperty({ type: String })
  name: string = '';

  @ApiPropertyOptional({ type: Boolean })
  isDefault: boolean;
}

export class DepartmentBaseRespose
  extends DepartmentBase
  implements IDepartment
{
  @ApiProperty({ type: Number })
  id: number = 0;

  @ApiPropertyOptional({ type: () => UserBaseResponse })
  users?: UserBaseResponse[];
}

export class DepartmentsRespose {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => [DepartmentBaseRespose] })
  data: DepartmentBaseRespose[] = [new DepartmentBaseRespose()];
}

export class DepartmentRespose {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => DepartmentBaseRespose })
  data: DepartmentBaseRespose = new DepartmentBaseRespose();
}

export class DepartmentAddRequest extends DepartmentBase {}
export class DepartmentUpdateRequest extends DepartmentBase {}
