import { Module } from '@nestjs/common';
import { ApplicationEventController } from './application-event.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [ApplicationEventController],
})
export class ApplicationEventModule {}
