import { Module } from '@nestjs/common';
import { RouterDbService } from './router-db.service';
import { RouterDbController } from './router-db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterDb } from './entities/router-db.entity';
import { Role } from 'src/users/entities/role.entity';

@Module({
  imports :[TypeOrmModule.forFeature([RouterDb,Role])],
  controllers: [RouterDbController],
  providers: [RouterDbService]
})
export class RouterDbModule {}
