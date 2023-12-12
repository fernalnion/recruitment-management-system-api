import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IJob, IJobBase } from 'src/schemas/job.schema';
import Mongoose from 'mongoose';

export class JobAddRequest implements IJobBase {
  @ApiProperty({ type: String })
  title: string = '';

  @ApiProperty({ type: String })
  description: string = '';

  @ApiProperty({ type: () => Mongoose.Schema.Types.ObjectId })
  department: Mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: Number })
  openings: number = 1;

  @ApiProperty({ type: [String] })
  skills: string[] = [];

  @ApiProperty({ type: Date })
  postedAt: Date = new Date();

  @ApiProperty({ type: Boolean })
  isActive: boolean = true;
}

export class JobUpdateRequest extends JobAddRequest implements IJobBase {}

export class JobBaseResponse extends JobAddRequest implements IJob {
  @ApiPropertyOptional({ type: () => Mongoose.Schema.Types.ObjectId })
  _id?: Mongoose.Schema.Types.ObjectId;
}

export class JobResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => JobBaseResponse })
  data: JobBaseResponse = new JobBaseResponse();
}

export class JobsResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => [JobBaseResponse] })
  data: JobBaseResponse[] = [new JobBaseResponse()];
}
