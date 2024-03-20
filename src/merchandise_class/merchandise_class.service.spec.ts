import { Test, TestingModule } from '@nestjs/testing';
import { MerchandiseClassService } from './merchandise_class.service';

describe('MerchandiseClassService', () => {
  let service: MerchandiseClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MerchandiseClassService],
    }).compile();

    service = module.get<MerchandiseClassService>(MerchandiseClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
