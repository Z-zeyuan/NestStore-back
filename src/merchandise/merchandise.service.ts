import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchandiseDto } from './dto/create-merchandise.dto';
import { UpdateMerchandiseDto } from './dto/update-merchandise.dto';
import { Goods } from './entities/merchandise.entity';
import { GoodsClass } from 'src/merchandise_class/Entities/merchandise_class.entity';
import { Class_Property } from 'src/merchandise_class/Entities/merchandise_class-property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { PaginationQueryDto } from 'src/COMMON/pagination-query.dto';

@Injectable()
export class MerchandiseService {
  constructor(
    @InjectRepository(Goods)
    private readonly Goodsrepo: Repository<Goods>,
    @InjectRepository(GoodsClass)
    private readonly Classrepo: Repository<GoodsClass>,
    @InjectRepository(Class_Property)
    private readonly Class_Propertyrepo: Repository<Class_Property>,
    private readonly connection: Connection,
  ) { }
  async createGoods(createMerchandiseDto: CreateMerchandiseDto) {
    try {
      const Good = new Goods()
      Good.name=createMerchandiseDto.name
      Good.price=createMerchandiseDto.price
      Good.SellAmount=0
      Good.StockAmount=0
      const ExistClass=await this.Classrepo.findOne({ where: { name: createMerchandiseDto.className } })
      Good.GoodsClass=ExistClass
      return await this.Goodsrepo.save(Good)
    } catch (error) {
      
    }
  }

  async findAllGoods() {
    try {
     // console.log("ijijoo")
      const a = await this.Goodsrepo.find({
        relations : ['GoodsClass']
      })
     // console.log(a)
     return await this.Goodsrepo.find({
        relations : ['GoodsClass']
      })
    } catch (error) {
      
    }
  }

  async findPagedGoods(PageDto : PaginationQueryDto) {
    try {
     // console.log("ijijoo")
      const a = await this.Goodsrepo.find({
        relations : ['GoodsClass']
      })
     // console.log(a)
     return await this.Goodsrepo.find({
        relations : ['GoodsClass'],
        skip : PageDto.offset,
        take : PageDto.limit
      })
    } catch (error) {
      
    }
  }

  async findOneGood(GoodName : string) {
    try {
      let Good= await this.Goodsrepo.findOne({ where: { name: GoodName }, relations : ['GoodsClass'] })
      return Good
    } catch (error) {
      
    }
    
  }

  async FindOneGoodById (Id:number) {
    try {
      let Good= await this.Goodsrepo.findOne({ where: { id: Id }, relations : ['GoodsClass'] })
      return Good
    } catch (error) {
      
    }
    
  }
  async FindManyGoodById (Ids:number[]) {
    try {

      var ManyGoods = []
      
      await Promise.all(Ids.map( async ID =>{
        let Good= await this.Goodsrepo.findOne({ where: { id: ID }, relations : ['GoodsClass'] })
        ManyGoods.push(Good)
        //console.log(Good)
        //console.log(ManyGoods)

      }))

      return  ManyGoods
    } catch (error) {
      
    }
    
  }
  
  async findOneClassOfGoods(Classname: string) {
    try {
      const ExistClass= await this.Classrepo.findOne({ where: { name: Classname } , relations:['Goods']})
      //console.log(ExistClass)
      return ExistClass.Goods
    } catch (error) {
      
    }

  }

  async findPagedOneClassOfGoods(Classname: string , PageDto:PaginationQueryDto) {
    try {
      const ExistClass= await this.Classrepo.findOne({ where: { name: Classname } , relations:['Goods']})
      //console.log(ExistClass)
      return ExistClass.Goods
    } catch (error) {
      
    }

  }

  async FindGoodAmount(){
    try {

      return (await this.Goodsrepo.find({
         relations : ['GoodsClass']
       })).length
     } catch (error) {
       
     }
  }

  async FindClassGoodAmount(Classname:string){
    const ExistClass= await this.Classrepo.findOne({ where: { name: Classname } , relations:['Goods']})
      return ExistClass.Goods.length
  }

  async updateGoodInfo( updateMerchandiseDto: UpdateMerchandiseDto) {
    try {
      
      const GoodtoModify =await this.Goodsrepo.findOne({ where: { name: updateMerchandiseDto.OldName } })
      if(!GoodtoModify){
        throw new NotFoundException()
      }
      
      GoodtoModify.price=updateMerchandiseDto.price
      GoodtoModify.name=updateMerchandiseDto.NewName
      GoodtoModify.SellAmount=updateMerchandiseDto.SellAmount
      GoodtoModify.StockAmount=updateMerchandiseDto.StockAmount
      const NewExistClass = await this.Classrepo.findOne({ where: { name: updateMerchandiseDto.NewClassName } })
      GoodtoModify.GoodsClass = NewExistClass
      if(updateMerchandiseDto.GoodDetail){
        GoodtoModify.GoodDetail = updateMerchandiseDto.GoodDetail
      }
      
      //console.log(GoodtoModify)
      await this.Goodsrepo.save(GoodtoModify)
      const GoodtoModify2 =await this.Goodsrepo.findOne({ where: { name: updateMerchandiseDto.name } })
      //console.log(GoodtoModify2)
      return await this.Goodsrepo.save(GoodtoModify2)
    } catch (error) {
      throw error
    }
  }

  async DeleteGood(GoodName :string) {
    try {
      const GoodtoKill = await this.Goodsrepo.findOne({ where: { name: GoodName } })
      return await this.Goodsrepo.remove(GoodtoKill)
    } catch (error) {
      
    }
  }
}
