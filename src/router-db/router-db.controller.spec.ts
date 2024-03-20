import { Test, TestingModule } from '@nestjs/testing';
import { RouterDbController } from './router-db.controller';
import { RouterDbService } from './router-db.service';

describe('RouterDbController', () => {
  let controller: RouterDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RouterDbController],
      providers: [RouterDbService],
    }).compile();

    controller = module.get<RouterDbController>(RouterDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
