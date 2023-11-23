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
import { ApplicantService } from 'src/business/applicant.service';
import {
  ApplicantAddRequest,
  ApplicantResponse,
  ApplicantUpdateRequest,
  ApplicantsResponse,
} from 'src/models/ApplicantDto';
import { BooleanResponse } from 'src/models/BooleanResponse';
import { ErrorResponse } from 'src/models/ErrorResponse';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Applicant')
@Controller('applicant')
@ApiResponse({
  status: 400,
  description: 'Invalid Applicant details in response',
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
  ApplicantAddRequest,
  ApplicantResponse,
  ApplicantUpdateRequest,
  ApplicantsResponse,
)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}
  @Post()
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ApplicantAddRequest })
  async createApplicant(@Body() payload: ApplicantAddRequest) {
    await this.applicantService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ApplicantsResponse) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllApplicants(): Promise<ApplicantsResponse> {
    const data = await this.applicantService.findAll();
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ApplicantResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  async getApplicant(@Param('id') id: string): Promise<ApplicantResponse> {
    const data = await this.applicantService.findOne(id);
    if (!data) {
      throw new Error('Invalid Applicant');
    }
    return {
      data,
      error: false,
    };
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(ApplicantUpdateRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: ApplicantUpdateRequest })
  async updateApplicant(
    @Param('id') id: string,
    @Body() payload: ApplicantUpdateRequest,
  ): Promise<ApplicantResponse> {
    const data = await this.applicantService.update(id, payload);

    if (!data) {
      throw new Error('Invalid Applicant');
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
  async deleteApplicant(@Param('id') id: string) {
    await this.applicantService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
