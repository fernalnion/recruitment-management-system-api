import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import Mongoose from 'mongoose';
import { JOB_APPLIED_STATUS_ENUM } from 'src/enums/status.enum';
import { IApplication, IApplicationBase } from 'src/schemas/application.schema';

export class ApplicationAddRequest implements IApplicationBase {
  @ApiProperty({ type: () => String })
  status: JOB_APPLIED_STATUS_ENUM = JOB_APPLIED_STATUS_ENUM.YET_TO_SCREEN;

  @ApiProperty({ type: Date })
  appliedAt: Date = new Date();

  @ApiProperty({ type: () => Mongoose.Schema.Types.ObjectId })
  applicant: Mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: String })
  job: Mongoose.Schema.Types.ObjectId;
}

export class ApplicationUpdateRequest
  extends ApplicationAddRequest
  implements IApplicationBase {}

export class ApplicationBaseResponse
  extends ApplicationAddRequest
  implements IApplication
{
  @ApiPropertyOptional({ type: () => Mongoose.Schema.Types.ObjectId })
  _id?: Mongoose.Schema.Types.ObjectId;
}

export class ApplicationResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => ApplicationBaseResponse })
  data: ApplicationBaseResponse = new ApplicationBaseResponse();
}

export class ApplicationsResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => [ApplicationBaseResponse] })
  data: ApplicationBaseResponse[] = [new ApplicationBaseResponse()];
}
