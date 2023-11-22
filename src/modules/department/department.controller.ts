import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  DepartmentRespose,
  DepartmentUpdateRequest,
  DepartmentsRespose,
} from 'src/models/Department';
import { ErrorResponse } from 'src/models/ErrorResponse';
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
  DepartmentRespose,
  DepartmentAddRequest,
  DepartmentUpdateRequest,
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
  async createUser(@Body() payload: DepartmentAddRequest) {
    await this.departmentService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(DepartmentsRespose) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllDepartments(): Promise<DepartmentsRespose> {
    const data = await this.departmentService.findAll();
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(DepartmentRespose) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number, required: true })
  async getUser(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DepartmentRespose> {
    const data = await this.departmentService.findOne(id);
    if (!data) {
      throw new Error('Invalid user');
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
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiBody({ type: DepartmentUpdateRequest })
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() payload: DepartmentUpdateRequest,
  ): Promise<DepartmentRespose> {
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
  @ApiParam({ name: 'id', type: Number, required: true })
  async deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    await this.departmentService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
