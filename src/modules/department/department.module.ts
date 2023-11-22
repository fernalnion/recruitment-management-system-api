import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { JwtService } from '@nestjs/jwt';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  controllers: [DepartmentController],
  providers: [JwtService],
})
export class DepartmentModule {}
