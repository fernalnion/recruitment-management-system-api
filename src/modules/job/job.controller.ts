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
import { JobService } from 'src/business/job.service';
import { BooleanResponse } from 'src/models/BooleanResponse';
import { ErrorResponse } from 'src/models/ErrorResponse';
import {
  JobAddRequest,
  JobResponse,
  JobUpdateRequest,
  JobsResponse,
} from 'src/models/JobDto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Job')
@Controller('job')
@ApiResponse({
  status: 400,
  description: 'Invalid Job details in response',
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
  JobAddRequest,
  JobResponse,
  JobUpdateRequest,
  JobsResponse,
)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Post()
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: JobAddRequest })
  async createJob(@Body() payload: JobAddRequest) {
    await this.jobService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(JobsResponse) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllComments(): Promise<JobsResponse> {
    const data = await this.jobService.findAll();
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(JobResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  async getJob(@Param('id') id: string): Promise<JobResponse> {
    const data = await this.jobService.findOne(id);
    if (!data) {
      throw new Error('Invalid Job');
    }
    return {
      data,
      error: false,
    };
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(JobUpdateRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: JobUpdateRequest })
  async updateJob(
    @Param('id') id: string,
    @Body() payload: JobUpdateRequest,
  ): Promise<JobResponse> {
    const data = await this.jobService.update(id, payload);

    if (!data) {
      throw new Error('Invalid Job');
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
  async deleteJob(@Param('id') id: string) {
    await this.jobService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
