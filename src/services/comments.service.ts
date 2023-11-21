import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findOne(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({ where: { id } });
  }

  async create(commentData: Partial<Comment>): Promise<Comment> {
    const department = this.commentRepository.create(commentData);
    return this.commentRepository.save(department);
  }

  async update(
    id: number,
    commentData: Partial<Comment>,
  ): Promise<Comment | null> {
    await this.commentRepository.update(id, commentData);
    return this.commentRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
