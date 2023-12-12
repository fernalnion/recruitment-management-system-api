import { Module } from '@nestjs/common';
import { UserService } from 'src/business/user.service';
import { SchemaModule } from 'src/schemas/schema.module';
import { ApplicantService } from './applicant.service';
import { ApplicationEventService } from './application-event.service';
import { ApplicationService } from './application.service';
import { CommentService } from './comment.service';
import { DepartmentService } from './department.service';
import { JobService } from './job.service';
import { ResumeService } from './resume.service';
import { RoleService } from './role.service';
import { JwtService } from '@nestjs/jwt';

const SERVICES = [
  JwtService,
  ApplicantService,
  ApplicationEventService,
  ApplicationService,
  CommentService,
  DepartmentService,
  JobService,
  ResumeService,
  RoleService,
  UserService,
];

@Module({
  imports: [SchemaModule],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class BusinessModule {}
