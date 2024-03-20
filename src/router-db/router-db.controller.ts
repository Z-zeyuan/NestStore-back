import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouterDbService } from './router-db.service';
import { CreateRouterDbDto } from './dto/create-router-db.dto';
import { UpdateRouterAccessDto } from './dto/update-router-db.dto';

@Controller('router-db')
export class RouterDbController {
  constructor(private readonly routerDbService: RouterDbService) {}


  @Post('FindAllPlain')
  findAll() {
    //console.log(roles)
    return this.routerDbService.FindAllPlainRouters();
  }
  @Post('AddRoutes')
  AddRoutes(@Body() CreateRouterDbDto) {
    //console.log(roles)
    return this.routerDbService.AddRoutes(CreateRouterDbDto);
  }


  @Patch('ModifyAccess')
  ModifyAccess(@Body() UpdateRouterAccessDto : UpdateRouterAccessDto) {
    //console.log(roles)
    return this.routerDbService.ModifyAccess(UpdateRouterAccessDto);
  }


  @Post('RoutesOfRole')
  findAllRoutesbyRole(@Body() roles ) {
    console.log(roles)
    return this.routerDbService.findAllByRoles(roles);
  }

  @Get('FindAll')
  findAllRouter() {
    return this.routerDbService.findAllRouter();
  }
}
