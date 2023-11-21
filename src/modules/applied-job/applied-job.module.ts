import { Module } from '@nestjs/common';
import { AppliedJobController } from './applied-job.controller';

@Module({
  controllers: [AppliedJobController],
})
export class AppliedJobModule {}
