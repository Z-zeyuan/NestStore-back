import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { createDealDto } from './dto/createDealDto.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Post()
  // create(@Body() createOrderDto: CreateOrderDto) {
  //   return this.orderService.createOrder(createOrderDto);
  // }

  @Post('CreateDeal')
  async createDeal(@Req() req: Request , @Body() createDealdto : createDealDto) {
    //console.log(createDealdto)
    return await this.orderService.createDeal(createDealdto, req);
  }

  @Get('AllDeals')
  async findAll() {
    return await this.orderService.findAllDeals();
  }

  @Get('FindUserDeal/:username')
  async findOneUserDeal(@Param('username') username: string) {
    return await this.orderService.findUserOrders(username);
  }

  @Patch('CompleteOrder/:id')
  async CompleteOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return await this.orderService.CompleteOrder(+id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
