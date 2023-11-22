import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import {
  Department,
  IDepartment,
  IDepartmentBase,
} from 'src/entities/department.entity';

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

export class DepartmentAddRequest extends OmitType(Department, [
  'id',
  'users',
] as const) {}
export class DepartmentUpdateRequest extends OmitType(Department, [
  'id',
  'users',
] as const) {}
