import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEvent } from 'src/entities/job-event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobEventService {
  constructor(
    @InjectRepository(JobEvent)
    private readonly jobEventRepository: Repository<JobEvent>,
  ) {}

  async findAll(): Promise<JobEvent[]> {
    return this.jobEventRepository.find();
  }

  async findOne(id: number): Promise<JobEvent | null> {
    return this.jobEventRepository.findOne({ where: { id } });
  }

  async create(jobEventData: Partial<JobEvent>): Promise<JobEvent> {
    const department = this.jobEventRepository.create(jobEventData);
    return this.jobEventRepository.save(department);
  }

  async update(
    id: number,
    jobEventData: Partial<JobEvent>,
  ): Promise<JobEvent | null> {
    await this.jobEventRepository.update(id, jobEventData);
    return this.jobEventRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.jobEventRepository.delete(id);
  }
}
