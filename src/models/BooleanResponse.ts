import { ApiProperty } from '@nestjs/swagger';

export class BooleanResponse {
  @ApiProperty({ type: Boolean })
  data: boolean = false;

  @ApiProperty({ type: Boolean })
  error = false;
}
