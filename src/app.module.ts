import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configuration';
import { ApplicantModule } from './modules/applicant/applicant.module';
import { AppliedJobController } from './modules/applied-job/applied-job.controller';
import { AppliedJobModule } from './modules/applied-job/applied-job.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { DepartmentModule } from './modules/department/department.module';
import { JobEventModule } from './modules/job-event/job-event.module';
import { JobModule } from './modules/job/job.module';
import { RoleModule } from './modules/role/role.module';
import { UsersModule } from './modules/users/users.module';
import { StartupService } from './services/startup.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ServiceModule } from './services/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST'),
          port: +configService.get('MYSQL_PORT'),
          username: configService.get('MYSQL_USER'),
          password: configService.get('MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          cli: {
            entitiesDir: __dirname + '/entities',
          },
          enumName: 'string',
          debug: true,
          verboseRetryLog: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ServiceModule,
    UsersModule,
    AuthModule,
    RoleModule,
    DepartmentModule,
    ApplicantModule,
    AppliedJobModule,
    CommentsModule,
    JobEventModule,
    JobModule,
  ],
  controllers: [AppController, AppliedJobController],
  providers: [AppService, JwtStrategy, JwtService, StartupService],
})
export class AppModule {}
