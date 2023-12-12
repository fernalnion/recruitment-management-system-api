import { Module } from '@nestjs/common';
import { ApplicantController } from './applicant.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [ApplicantController],
})
export class ApplicantModule {}
