import { Module } from '@nestjs/common';
import { JobEventController } from './job-event.controller';

@Module({
  controllers: [JobEventController],
  providers: [],
})
export class JobEventModule {}
