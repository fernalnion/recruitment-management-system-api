import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Applicant, ApplicantSchema } from './applicant.schema';
import {
  ApplicationEvent,
  ApplicationEventSchema,
} from './application-event.schema';
import { Application, ApplicationSchema } from './application.schema';
import { Comment, CommentSchema } from './comment.schema';
import { Department, DepartmentSchema } from './department.schema';
import { Job, JobSchema } from './job.schema';
import { Resume, ResumeSchema } from './resume.schema';
import { Role, RoleSchema } from './role.schema';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: User.name, schema: UserSchema },
      { name: Job.name, schema: JobSchema },
      { name: Applicant.name, schema: ApplicantSchema },
      { name: Application.name, schema: ApplicationSchema },
      { name: ApplicationEvent.name, schema: ApplicationEventSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Resume.name, schema: ResumeSchema },
    ]),
  ],
  providers: [],
  exports: [MongooseModule],
})
export class SchemaModule {}
