import { Module } from '@nestjs/common';
import { BusinessModule } from 'src/business/business.module';
import { RoleController } from './role.controller';

@Module({
  imports: [BusinessModule],
  controllers: [RoleController],
})
export class RoleModule {}
