import { Module } from '@nestjs/common';
import { BusinessModule } from 'src/business/business.module';
import { UsersController } from './users.controller';

@Module({
  imports: [BusinessModule],
  controllers: [UsersController],
})
export class UsersModule {}
