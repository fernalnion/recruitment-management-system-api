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
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserService } from 'src/business/user.service';
import { User } from 'src/entities/user.entity';
import { BooleanResponse } from 'src/models/BooleanResponse';
import { ErrorResponse } from 'src/models/ErrorResponse';
import {
  UserAddRequest,
  UserResponse,
  UserUpdateRequest,
  UsersResponse,
} from 'src/models/User';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@Controller('user')
@ApiResponse({
  status: 400,
  description: 'Invalid User details in response',
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
  UsersResponse,
  BooleanResponse,
  UserAddRequest,
  UserUpdateRequest,
)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: UserAddRequest })
  async createUser(@Body() payload: User) {
    await this.userService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(UsersResponse) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    const users = await this.userService.findAll();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = users.map(({ password, ...user }) => user);
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(UserResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number, required: true })
  async getUser(@Param('id', new ParseIntPipe()) id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error('Invalid user');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = user;
    return {
      data,
      error: false,
    };
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(UserUpdateRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiBody({ type: UserUpdateRequest })
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() payload: UserUpdateRequest,
  ) {
    return {
      data: payload,
      error: false,
    };
  }

  @Put(':id/:status')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(UserAddRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiParam({ name: 'status', type: Boolean, required: true })
  async updateUserStatus(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('status', new ParseIntPipe()) status: boolean,
  ) {
    await this.userService.update(id, { isActive: status });
    return {
      data: true,
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
    await this.userService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
