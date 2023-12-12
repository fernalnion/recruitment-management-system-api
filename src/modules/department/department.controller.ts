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
import { DepartmentService } from 'src/business/department.service';
import { BooleanResponse } from 'src/models/BooleanResponse';
import {
  DepartmentAddRequest,
  DepartmentResponse,
  DepartmentUpdateRequest,
  DepartmentsResponse,
} from 'src/models/DepartmentDto';
import { ErrorResponse } from 'src/models/ErrorResponse';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('Department')
@Controller('department')
@ApiResponse({
  status: 400,
  description: 'Invalid Department details in response',
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
  DepartmentAddRequest,
  DepartmentResponse,
  DepartmentUpdateRequest,
  DepartmentsResponse,
)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.CREATED)
  async createDepartment(@Body() payload: DepartmentAddRequest) {
    await this.departmentService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(DepartmentsResponse) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllDepartments(): Promise<DepartmentsResponse> {
    const data = await this.departmentService.findAll();
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(DepartmentResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  async getDepartment(@Param('id') id: string): Promise<DepartmentResponse> {
    const data = await this.departmentService.findOne(id);
    if (!data) {
      throw new Error('Invalid Department');
    }
    return {
      data,
      error: false,
    };
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(DepartmentUpdateRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: DepartmentUpdateRequest })
  async updateDepartment(
    @Param('id') id: string,
    @Body() payload: DepartmentUpdateRequest,
  ): Promise<DepartmentResponse> {
    const data = await this.departmentService.update(id, payload);

    if (!data) {
      throw new Error('Invalid Department');
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
  async deleteDepartment(@Param('id') id: string) {
    await this.departmentService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
