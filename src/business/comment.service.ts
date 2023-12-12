import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, IComment, ICommentBase } from 'src/schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find();
  }

  async findOne(_id: string): Promise<IComment | null> {
    return this.commentModel.findOne({ _id });
  }

  async create(data: ICommentBase): Promise<IComment> {
    const comment = new this.commentModel(data);
    return comment.save();
  }

  async update(_id: string, data: Partial<IComment>): Promise<IComment | null> {
    return this.commentModel.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: string): Promise<void> {
    await this.commentModel.deleteOne({ _id });
  }
}
