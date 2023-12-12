import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IApplicant, IApplicantBase } from 'src/schemas/applicant.schema';
import Mongoose from 'mongoose';

export class ApplicantAddRequest implements IApplicantBase {
  @ApiProperty({ type: String })
  firstname: string = '';

  @ApiProperty({ type: String })
  lastname: string = '';

  @ApiProperty({ type: String })
  email: string = '';

  @ApiProperty({ type: String })
  mobile: string = '';

  @ApiProperty({ type: String })
  profilepath: string = '';
}

export class ApplicantUpdateRequest
  extends ApplicantAddRequest
  implements IApplicantBase {}

export class ApplicantBaseResponse
  extends ApplicantAddRequest
  implements IApplicant
{
  @ApiPropertyOptional({ type: () => Mongoose.Schema.Types.ObjectId })
  _id?: Mongoose.Schema.Types.ObjectId;
}

export class ApplicantResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => ApplicantBaseResponse })
  data: ApplicantBaseResponse = new ApplicantBaseResponse();
}

export class ApplicantsResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => [ApplicantBaseResponse] })
  data: ApplicantBaseResponse[] = [new ApplicantBaseResponse()];
}
