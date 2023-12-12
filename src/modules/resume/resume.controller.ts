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
import { ResumeService } from 'src/business/resume.service';
import { BooleanResponse } from 'src/models/BooleanResponse';
import { ErrorResponse } from 'src/models/ErrorResponse';
import {
  ResumeAddRequest,
  ResumeResponse,
  ResumeUpdateRequest,
  ResumesResponse,
} from 'src/models/ResumeDto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Resume')
@Controller('resume')
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
  ResumeAddRequest,
  ResumeResponse,
  ResumeUpdateRequest,
  ResumesResponse,
)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}
  @Post()
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ResumeAddRequest })
  async createResume(@Body() payload: ResumeAddRequest) {
    await this.resumeService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ResumesResponse) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllComments(): Promise<ResumesResponse> {
    const data = await this.resumeService.findAll();
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ResumeResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  async getResume(@Param('id') id: string): Promise<ResumeResponse> {
    const data = await this.resumeService.findOne(id);
    if (!data) {
      throw new Error('Invalid Resume');
    }
    return {
      data,
      error: false,
    };
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ResumeUpdateRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: ResumeUpdateRequest })
  async updateResume(
    @Param('id') id: string,
    @Body() payload: ResumeUpdateRequest,
  ): Promise<ResumeResponse> {
    const data = await this.resumeService.update(id, payload);

    if (!data) {
      throw new Error('Invalid Resume');
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
  async deleteResume(@Param('id') id: string) {
    await this.resumeService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
