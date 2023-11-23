import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApplicationEventService } from 'src/business/application-event.service';
import {
  ApplicationEventAddRequest,
  ApplicationEventResponse,
  ApplicationEventUpdateRequest,
  ApplicationEventsResponse,
} from 'src/models/ApplicationEventDto';
import { BooleanResponse } from 'src/models/BooleanResponse';
import { ErrorResponse } from 'src/models/ErrorResponse';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Application Even')
@Controller('application-event')
@ApiResponse({
  status: 400,
  description: 'Invalid Application Event details in response',
  schema: { $ref: getSchemaPath(ErrorResponse) },
})
@ApiResponse({
  status: 404,
  description: 'Not found',
  schema: { $ref: getSchemaPath(ErrorResponse) },
})
@ApiResponse({
  status: 500,
  description: 'Server error',
  schema: { $ref: getSchemaPath(ErrorResponse) },
})
@ApiExtraModels(
  ErrorResponse,
  BooleanResponse,
  ApplicationEventAddRequest,
  ApplicationEventResponse,
  ApplicationEventUpdateRequest,
  ApplicationEventsResponse,
)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ApplicationEventController {
  constructor(
    private readonly applicationEventService: ApplicationEventService,
  ) {}
  @Post()
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ApplicationEventAddRequest })
  async createApplicationEvent(@Body() payload: ApplicationEventAddRequest) {
    await this.applicationEventService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ApplicationEventsResponse) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllApplications(): Promise<ApplicationEventsResponse> {
    const data = await this.applicationEventService.findAll();
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ApplicationEventResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  async getApplicationEvent(
    @Param('id') id: string,
  ): Promise<ApplicationEventResponse> {
    const data = await this.applicationEventService.findOne(id);
    if (!data) {
      throw new Error('Invalid Application Event');
    }
    return {
      data,
      error: false,
    };
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ApplicationEventUpdateRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: ApplicationEventUpdateRequest })
  async updateApplicationEvent(
    @Param('id') id: string,
    @Body() payload: ApplicationEventUpdateRequest,
  ): Promise<ApplicationEventResponse> {
    const data = await this.applicationEventService.update(id, payload);

    if (!data) {
      throw new Error('Invalid Application Event');
    }
    return {
      data,
      error: false,
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  async deleteApplicationEvent(@Param('id') id: string) {
    await this.applicationEventService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
