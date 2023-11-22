import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BusinessModule } from 'src/business/business.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [BusinessModule],
  controllers: [UsersController],
  providers: [JwtService],
})
export class UsersModule {}
