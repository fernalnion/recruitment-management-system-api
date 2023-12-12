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
import { CommentService } from 'src/business/comment.service';
import { BooleanResponse } from 'src/models/BooleanResponse';
import {
  CommentAddRequest,
  CommentResponse,
  CommentUpdateRequest,
  CommentsResponse,
} from 'src/models/CommentDto';
import { ErrorResponse } from 'src/models/ErrorResponse';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Comment')
@Controller('comment')
@ApiResponse({
  status: 400,
  description: 'Invalid Comment details in response',
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
  CommentAddRequest,
  CommentResponse,
  CommentUpdateRequest,
  CommentsResponse,
)
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(BooleanResponse) },
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CommentAddRequest })
  async createComment(@Body() payload: CommentAddRequest) {
    await this.commentService.create(payload);
    return {
      data: true,
      error: false,
    };
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(CommentsResponse) },
  })
  @HttpCode(HttpStatus.OK)
  async getAllComments(): Promise<CommentsResponse> {
    const data = await this.commentService.findAll();
    return {
      data,
      error: false,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(CommentResponse) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  async getComment(@Param('id') id: string): Promise<CommentResponse> {
    const data = await this.commentService.findOne(id);
    if (!data) {
      throw new Error('Invalid Comment');
    }
    return {
      data,
      error: false,
    };
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(CommentUpdateRequest) },
  })
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiBody({ type: CommentUpdateRequest })
  async updateComment(
    @Param('id') id: string,
    @Body() payload: CommentUpdateRequest,
  ): Promise<CommentResponse> {
    const data = await this.commentService.update(id, payload);

    if (!data) {
      throw new Error('Invalid Comment');
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
  async deleteComment(@Param('id') id: string) {
    await this.commentService.remove(id);
    return {
      data: true,
      error: false,
    };
  }
}
