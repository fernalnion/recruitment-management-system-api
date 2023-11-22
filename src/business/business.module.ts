import { Module } from '@nestjs/common';
import { UserService } from 'src/business/user.service';
import { ApplicantService } from './applicant.service';
import { AppliedJobService } from './applied-job.service';
import { CommentsService } from './comments.service';
import { DepartmentService } from './department.service';
import { JobEventService } from './job-event.service';
import { JobService } from './job.service';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from 'src/entities/applicant.entity';
import { AppliedJob } from 'src/entities/applied-job.entity';
import { Department } from 'src/entities/department.entity';
import { JobEvent } from 'src/entities/job-event.entity';
import { Job } from 'src/entities/job.entity';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';

const SERVICES = [
  ApplicantService,
  AppliedJobService,
  CommentsService,
  DepartmentService,
  JobEventService,
  JobService,
  RoleService,
  UserService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Applicant,
      AppliedJob,
      Comment,
      Department,
      JobEvent,
      Job,
      Role,
      User,
    ]),
  ],
  providers: [...SERVICES],
  exports: [TypeOrmModule, ...SERVICES],
})
export class BusinessModule {}
