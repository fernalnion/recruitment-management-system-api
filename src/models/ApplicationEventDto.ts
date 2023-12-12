import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import Mongoose from 'mongoose';
import {
  IApplicationEvent,
  IApplicationEventBase,
} from 'src/schemas/application-event.schema';

export class ApplicationEventAddRequest implements IApplicationEventBase {
  @ApiProperty({ type: Boolean })
  isCanceled: boolean = false;

  @ApiProperty({ type: Date })
  appliedAt: Date = new Date();

  @ApiProperty({ type: () => Mongoose.Schema.Types.ObjectId })
  application: Mongoose.Schema.Types.ObjectId;
}

export class ApplicationEventUpdateRequest
  extends ApplicationEventAddRequest
  implements IApplicationEventBase {}

export class ApplicationEventBaseResponse
  extends ApplicationEventAddRequest
  implements IApplicationEvent
{
  @ApiPropertyOptional({ type: () => Mongoose.Schema.Types.ObjectId })
  _id?: Mongoose.Schema.Types.ObjectId;
}

export class ApplicationEventResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => ApplicationEventBaseResponse })
  data: ApplicationEventBaseResponse = new ApplicationEventBaseResponse();
}

export class ApplicationEventsResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => [ApplicationEventBaseResponse] })
  data: ApplicationEventBaseResponse[] = [new ApplicationEventBaseResponse()];
}
