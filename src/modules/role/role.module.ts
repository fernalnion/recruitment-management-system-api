import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { BusinessModule } from 'src/business/business.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [BusinessModule],
  providers: [JwtService],
  controllers: [RoleController],
})
export class RoleModule {}
