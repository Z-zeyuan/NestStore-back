import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './coffees/entities/coffee.entity';
import { User } from './users/entities/user.entity';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [CoffeesModule, UsersModule, 
    TypeOrmModule.forRootAsync({useFactory: () => ({
    type : 'postgres' , 
    host : process.env.DATABASE_HOST,
    port : +process.env.DATABASE_PORT,
    username : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    autoLoadEntities : true,
    synchronize : true
  })}), IamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
