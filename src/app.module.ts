import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessModule } from './business/business.module';
import configuration from './configuration';
import { ApplicationController } from './modules/application/application.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StartupService } from './services/startup.service';
import { DepartmentModule } from './modules/department/department.module';
import { RoleModule } from './modules/role/role.module';
import { ApplicantModule } from './modules/applicant/applicant.module';
import { ApplicationModule } from './modules/application/application.module';
import { ApplicationEventModule } from './modules/application-event/application-event.module';
import { CommentModule } from './modules/comment/comment.module';
import { JobModule } from './modules/job/job.module';
import { ResumeModule } from './modules/resume/resume.module';

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
    DepartmentModule,
    RoleModule,
    UsersModule,
    ApplicantModule,
    ApplicationModule,
    ApplicationEventModule,
    CommentModule,
    JobModule,
    ResumeModule,
  ],
  controllers: [AppController, ApplicationController],
  providers: [AppService, StartupService],
})
export class AppModule {}
