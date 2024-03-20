import { Test, TestingModule } from '@nestjs/testing';
import { BcriptService } from './bcript.service';

describe('BcriptService', () => {
  let service: BcriptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcriptService],
    }).compile();

    service = module.get<BcriptService>(BcriptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
