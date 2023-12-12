import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [CommentController],
})
export class CommentModule {}
