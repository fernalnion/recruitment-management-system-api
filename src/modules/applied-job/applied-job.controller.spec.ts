import { Test, TestingModule } from '@nestjs/testing';
import { AppliedJobController } from './applied-job.controller';

describe('AppliedJobController', () => {
  let controller: AppliedJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppliedJobController],
    }).compile();

    controller = module.get<AppliedJobController>(AppliedJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
