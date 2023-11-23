import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [JobController],
})
export class JobModule {}
