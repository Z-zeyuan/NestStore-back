import { Test, TestingModule } from '@nestjs/testing';
import { RouterDbService } from './router-db.service';

describe('RouterDbService', () => {
  let service: RouterDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RouterDbService],
    }).compile();

    service = module.get<RouterDbService>(RouterDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
