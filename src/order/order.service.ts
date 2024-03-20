import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/Order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Goods } from 'src/merchandise/entities/merchandise.entity';
import { GoodsClass } from 'src/merchandise_class/Entities/merchandise_class.entity';
import { Repository, Connection, Timestamp } from 'typeorm';
import { Deal } from './entities/Deal.entity';
import { User } from 'src/users/entities/user.entity';
import { createDealDto } from './dto/createDealDto.dto';
import { JwtService } from '@nestjs/jwt';
import { async } from 'rxjs';





@Injectable()
export class OrderService {
  constructor(
    private readonly jwtservice: JwtService,

    @InjectRepository(Goods)
    private readonly Goodsrepo: Repository<Goods>,
    @InjectRepository(Order)
    private readonly Orderrepo: Repository<Order>,
    @InjectRepository(Deal)
    private readonly Dealrepo: Repository<Deal>,
    @InjectRepository(User)
    private readonly Userrepo: Repository<User>,
    private readonly connection: Connection,
  ) { }
  async createDeal(createDealdto: createDealDto, req: Request) {
    const NewDeal = new Deal()
    const userId = req['user'].sub
    const User = await this.Userrepo.findOne({ where: { id: userId } })
    NewDeal.User = User
    NewDeal.status = false
    NewDeal.totalprice = createDealdto.Totalprice
    const OrderGoodsInfo = createDealdto.GoodsIds
    let OrdersOfDeal = []
    await Promise.all(OrderGoodsInfo.map(
      async (GoodInfo)=>{
        let OrderOfTheGood = await this.createOrder(GoodInfo.Id ,GoodInfo.Amount)
        await this.Orderrepo.save(OrderOfTheGood)
        OrdersOfDeal.push(OrderOfTheGood)
      }
    ))
    NewDeal.Orders = OrdersOfDeal
    console.log(NewDeal)
    return await this.Dealrepo.save(NewDeal)
    // let Ids = createOrderDto.GoodsIds;
    // let TotalPrice=0
    // Ids.map(async (Id) => {
    //   let Good =await this.Goodsrepo.findOne({where : { id:Id}})
    //   TotalPrice+=Good.price
    //   let GoodJson : JSON= JSON.parse(JSON.stringify({"id" : Good.id.toString() ,"status" : (false).toString() }))
    //   NewOrder.GoodId.push(GoodJson)
    // })
    // NewOrder.totalprice=TotalPrice
    // return await this.Orderrepo.save(NewOrder)
  }
  async createOrder(Id: number , Amount: number){
    let order = new Order()
    const GoodOfOrder =  await this.Goodsrepo.findOne({where : { id:Id}})
    order.Goods = GoodOfOrder
    order.GoodNum = Amount
    order.status = false
    order.totalprice = Amount*GoodOfOrder.price
    return order
  }

  async findAllDeals() {
    const AllOrders = await this.Orderrepo.find({ relations : ['Goods' , 'Deal']})
    const AllDeals = await this.Dealrepo.find({ relations : ['User']})
    Promise.all( AllDeals.map(
     async (deal) => {
        AllOrders.map(
          (order) => {
            if(deal.id == order.Deal.id){
              order.Deal = deal
            }
          }
        )
      }
    ))
    //console.log(AllOrders)
    return this.sortResult(AllOrders)
  }

  async findUserOrders(username: string) {
    const User = await this.Userrepo.findOne({ where: { name : username } })
    //console.log(User)
    const DealOfUser =  await this.Dealrepo.find({ where: { User : User } })
    //console.log(DealOfUser)
    let Orders = await this.Orderrepo.find({ relations : ['Goods' , 'Deal']})
    let UserOrders = []
    Promise.all(Orders.map(
      async (Order) => {
        //console.log(Order.Deal)
        DealOfUser.forEach(
          deal => {
            if(deal.id  == Order.Deal.id ){
              //console.log(Order)
              UserOrders.push(Order)

            }
    
          }
        )
        
      }
    ))
     
    //console.log(UserOrders)
    return this.sortResult(UserOrders)
  }

  async CompleteOrder(id: number, updateOrderDto: UpdateOrderDto) {
    let order = await this.Orderrepo.findOne({ where: { id : id } })
    order.status = updateOrderDto.CurrentOrderStatus
    let response = await this.Orderrepo.save(order)
    await this.checkDealComplete()
    return response
  }

  async checkDealComplete(){
    const AllDeals = await this.Dealrepo.find({ relations : ['Orders']})
    AllDeals.map(
      deal => {
        let IsDealComplete = true
        Promise.all(deal.Orders.map(
          async order => {
            if(!order.status){
              IsDealComplete = false
            }
          }
        ))
        deal.status = IsDealComplete
        
      }
    )
    this.Dealrepo.save(AllDeals)
  }

  async remove(id: number) {
    const OrderToKill = await this.Orderrepo.findOne({ where: { id: id } })
    return await this.Orderrepo.remove(OrderToKill)
  }


  sortResult(ResultArr :Array<any>){
          let n = ResultArr.length;
         for(let i = 0; i < n - 1; i++){
              let min = i;
              for (let j = i + 1; j < n; j++) {
                 if(ResultArr[min].id > ResultArr[j].id){min = j;} 
              }
              //交换
             let temp = ResultArr[i];
             ResultArr[i] = ResultArr[min];
             ResultArr[min] = temp;
         }
         return ResultArr
  }
}
