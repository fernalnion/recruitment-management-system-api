import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IComment, ICommentBase } from 'src/schemas/comment.schema';
import Mongoose from 'mongoose';

export class CommentAddRequest implements ICommentBase {
  @ApiProperty({ type: String })
  title: string = '';

  @ApiProperty({ type: String })
  description: string = '';

  @ApiProperty({ type: () => Mongoose.Schema.Types.ObjectId })
  application: Mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: () => Mongoose.Schema.Types.ObjectId })
  applicationevent: Mongoose.Schema.Types.ObjectId;
}

export class CommentUpdateRequest
  extends CommentAddRequest
  implements ICommentBase {}

export class CommentBaseResponse extends CommentAddRequest implements IComment {
  @ApiPropertyOptional({ type: () => Mongoose.Schema.Types.ObjectId })
  _id?: Mongoose.Schema.Types.ObjectId;
}

export class CommentResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => CommentBaseResponse })
  data: CommentBaseResponse = new CommentBaseResponse();
}

export class CommentsResponse {
  @ApiProperty({ type: Boolean })
  error: boolean = false;

  @ApiProperty({ type: () => [CommentBaseResponse] })
  data: CommentBaseResponse[] = [new CommentBaseResponse()];
}
