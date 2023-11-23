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
import { RoleService } from 'src/business/role.service';
import { BooleanResponse } from 'src/models/BooleanResponse';
import { ErrorResponse } from 'src/models/ErrorResponse';
import {
  RoleAddRequest,
  RoleResponse,
  RoleUpdateRequest,
  RolesResponse,
} from 'src/models/RoleDto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Role')
@Controller('role')
@ApiResponse({
  status: 400,
  description: 'Invalid Role details in response',
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
  RoleAddRequest,
  RoleResponse,
  RoleUpdateRequest,
  RolesResponse,
)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post()
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: RoleAddRequest })
  async createUser(@Body() payload: RoleAddRequest) {
    await this.roleService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(RolesResponse) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllRoles(): Promise<RolesResponse> {
    const data = await this.roleService.findAll();
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(RoleResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  async getUser(@Param('id') id: string): Promise<RoleResponse> {
    const data = await this.roleService.findOne(id);
    if (!data) {
      throw new Error('Invalid Role');
    }
    return {
      data,
      error: false,
    };
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(RoleUpdateRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: RoleUpdateRequest })
  async updateUser(
    @Param('id') id: string,
    @Body() payload: RoleUpdateRequest,
  ): Promise<RoleResponse> {
    const data = await this.roleService.update(id, payload);

    if (!data) {
      throw new Error('Invalid Role');
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
  async deleteUser(@Param('id') id: string) {
    await this.roleService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
