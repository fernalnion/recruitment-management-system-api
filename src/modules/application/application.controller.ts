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
import { ApplicationService } from 'src/business/application.service';
import {
  ApplicationAddRequest,
  ApplicationResponse,
  ApplicationUpdateRequest,
  ApplicationsResponse,
} from 'src/models/ApplicationDto';
import { BooleanResponse } from 'src/models/BooleanResponse';
import { ErrorResponse } from 'src/models/ErrorResponse';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Application')
@Controller('application')
@ApiResponse({
  status: 400,
  description: 'Invalid Application details in response',
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
  ApplicationAddRequest,
  ApplicationResponse,
  ApplicationUpdateRequest,
  ApplicationsResponse,
)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Post()
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ApplicationAddRequest })
  async createApplication(@Body() payload: ApplicationAddRequest) {
    await this.applicationService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ApplicationsResponse) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllApplications(): Promise<ApplicationsResponse> {
    const data = await this.applicationService.findAll();
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ApplicationResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  async getApplication(@Param('id') id: string): Promise<ApplicationResponse> {
    const data = await this.applicationService.findOne(id);
    if (!data) {
      throw new Error('Invalid Application');
    }
    return {
      data,
      error: false,
    };
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ApplicationUpdateRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: ApplicationUpdateRequest })
  async updateApplication(
    @Param('id') id: string,
    @Body() payload: ApplicationUpdateRequest,
  ): Promise<ApplicationResponse> {
    const data = await this.applicationService.update(id, payload);

    if (!data) {
      throw new Error('Invalid Application');
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
  async deleteApplication(@Param('id') id: string) {
    await this.applicationService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
