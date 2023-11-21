import { Module } from '@nestjs/common';
import { JobController } from './job.controller';

@Module({
  controllers: [JobController],
  providers: [],
})
export class JobModule {}
