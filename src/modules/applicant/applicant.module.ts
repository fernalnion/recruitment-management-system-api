import { Module } from '@nestjs/common';
import { ApplicantController } from './applicant.controller';

@Module({
  controllers: [ApplicantController],
})
export class ApplicantModule {}
