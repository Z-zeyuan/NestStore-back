import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';

import { OrderModule } from './order/order.module';
import { MerchandiseClassModule } from './merchandise_class/merchandise_class.module';
import { MerchandiseModule } from './merchandise/merchandise.module';
import { RouterDbModule } from './router-db/router-db.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ UsersModule, 
    TypeOrmModule.forRootAsync({useFactory: () => ({
    type : 'postgres' , 
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    password : 'pass123',
    database : 'postgres',
    autoLoadEntities : true,
    synchronize : true
  })}), IamModule,ConfigModule.forRoot(), MerchandiseModule, OrderModule, MerchandiseClassModule, RouterDbModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    exclude: ['/api*'],
    
  },
  ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
