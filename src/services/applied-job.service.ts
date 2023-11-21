import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppliedJob } from 'src/entities/applied-job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppliedJobService {
  constructor(
    @InjectRepository(AppliedJob)
    private readonly appliedJobRepository: Repository<AppliedJob>,
  ) {}

  async findAll(): Promise<AppliedJob[]> {
    return this.appliedJobRepository.find();
  }

  async findOne(id: number): Promise<AppliedJob | null> {
    return this.appliedJobRepository.findOne({ where: { id } });
  }

  async create(data: Partial<AppliedJob>): Promise<AppliedJob> {
    const department = this.appliedJobRepository.create(data);
    return this.appliedJobRepository.save(department);
  }

  async update(
    id: number,
    data: Partial<AppliedJob>,
  ): Promise<AppliedJob | null> {
    await this.appliedJobRepository.update(id, data);
    return this.appliedJobRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.appliedJobRepository.delete(id);
  }
}
