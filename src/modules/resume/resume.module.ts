import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [ResumeController],
})
export class ResumeModule {}
