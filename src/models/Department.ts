import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Department } from 'src/entities/department.entity';

class DepartmentBase {
  @ApiProperty({ type: String })
  name: string = '';

  @ApiPropertyOptional({ type: Boolean })
  isDefault: boolean;
}

export class DepartmentBaseRespose extends DepartmentBase {
  @ApiProperty({ type: Number })
  id: number = 0;
}

export class DepartmentsRespose {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => [Department] })
  data: Department[] = [];
}

export class DepartmentRespose {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => Department })
  data: Department = new Department();
}

export class DepartmentAddRequest extends OmitType(Department, [
  'id',
  'jobs',
  'users',
] as const) {}
export class DepartmentUpdateRequest extends OmitType(Department, [
  'id',
  'jobs',
  'users',
] as const) {}
