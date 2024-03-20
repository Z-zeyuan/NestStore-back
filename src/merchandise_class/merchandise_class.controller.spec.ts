import { Test, TestingModule } from '@nestjs/testing';
import { MerchandiseClassController } from './merchandise_class.controller';
import { MerchandiseClassService } from './merchandise_class.service';

describe('MerchandiseClassController', () => {
  let controller: MerchandiseClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MerchandiseClassController],
      providers: [MerchandiseClassService],
    }).compile();

    controller = module.get<MerchandiseClassController>(MerchandiseClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
