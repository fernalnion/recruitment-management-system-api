import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessModule } from './business/business.module';
import configuration from './configuration';
import { AppliedJobController } from './modules/applied-job/applied-job.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StartupService } from './services/startup.service';
import { DepartmentModule } from './modules/department/department.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        <MongooseModuleFactoryOptions>configService.get('mongodb'),
      inject: [ConfigService],
    }),
    BusinessModule,
    AuthModule,
    UsersModule,
    DepartmentModule,
    RoleModule,
  ],
  controllers: [AppController, AppliedJobController],
  providers: [AppService, StartupService],
})
export class AppModule {}
