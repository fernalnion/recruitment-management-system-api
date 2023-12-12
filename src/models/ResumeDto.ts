import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IResume, IResumeBase } from 'src/schemas/resume.schema';
import Mongoose from 'mongoose';

export class ResumeAddRequest implements IResumeBase {
  @ApiProperty({ type: String })
  filepath: string;

  @ApiProperty({ type: () => Mongoose.Schema.Types.ObjectId })
  applicant: Mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: [String] })
  skills: string[];
}

export class ResumeUpdateRequest
  extends ResumeAddRequest
  implements IResumeBase {}

export class ResumeBaseResponse extends ResumeAddRequest implements IResume {
  @ApiPropertyOptional({ type: () => Mongoose.Schema.Types.ObjectId })
  _id?: Mongoose.Schema.Types.ObjectId;
}

export class ResumeResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => ResumeBaseResponse })
  data: ResumeBaseResponse = new ResumeBaseResponse();
}

export class ResumesResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => [ResumeBaseResponse] })
  data: ResumeBaseResponse[] = [new ResumeBaseResponse()];
}
