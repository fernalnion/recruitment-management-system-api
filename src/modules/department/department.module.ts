import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { JwtService } from '@nestjs/jwt';
import { BusinessModule } from 'src/business/business.module';

@Module({
  imports: [BusinessModule],
  providers: [JwtService],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
