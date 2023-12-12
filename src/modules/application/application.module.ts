import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
