import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IRole, IRoleBase } from 'src/entities/role.entity';

class RoleBase implements IRoleBase {
  @ApiProperty({ type: String })
  name: string = '';

  @ApiPropertyOptional({ type: Boolean })
  isDefault?: boolean;
}

export class RoleBaseRespose extends RoleBase implements IRole {
  @ApiProperty({ type: Number })
  id: number = 0;
}

export class RolesRespose {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => [RoleBaseRespose] })
  data: RoleBaseRespose[] = [new RoleBaseRespose()];
}

export class RoleRespose {
  @ApiProperty({ type: Boolean })
  error: boolean;

  @ApiProperty({ type: () => RoleBaseRespose })
  data: RoleBaseRespose = new RoleBaseRespose();
}

export class RoleAddRequest extends RoleBase {}
export class RoleUpdateRequest extends RoleAddRequest {}
