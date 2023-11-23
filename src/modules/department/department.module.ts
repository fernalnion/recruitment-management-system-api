import { Module } from '@nestjs/common';
import { BusinessModule } from 'src/business/business.module';
import { DepartmentController } from './department.controller';

@Module({
  imports: [BusinessModule],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
