import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiPropertyOptional({ type: String })
  errormessage?: string | null;

  @ApiProperty({ type: Boolean })
  error = false;
}
