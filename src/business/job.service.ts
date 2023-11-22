import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async findOne(id: number): Promise<Job | null> {
    return this.jobRepository.findOne({ where: { id } });
  }

  async create(jobData: Partial<Job>): Promise<Job> {
    const department = this.jobRepository.create(jobData);
    return this.jobRepository.save(department);
  }

  async update(id: number, jobData: Partial<Job>): Promise<Job | null> {
    await this.jobRepository.update(id, jobData);
    return this.jobRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
