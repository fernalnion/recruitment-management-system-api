import { Test, TestingModule } from '@nestjs/testing';
import { JobEventController } from './job-event.controller';

describe('JobEventController', () => {
  let controller: JobEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobEventController],
    }).compile();

    controller = module.get<JobEventController>(JobEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
