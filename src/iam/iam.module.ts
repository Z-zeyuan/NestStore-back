import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcriptService } from './hashing/bcript.service';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  providers: [{
    provide :HashingService,
    useClass : BcriptService}],
  controllers: [AuthenticationController]
})
export class IamModule {}
