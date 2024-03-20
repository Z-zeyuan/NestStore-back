import { Injectable } from '@nestjs/common';
import { CreateMerchandiseClassDto } from './dto/create-merchandise_class.dto';
import { UpdateMerchandiseClassDto } from './dto/update-merchandise_class.dto';
import { GoodsClass } from './Entities/merchandise_class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Goods } from 'src/merchandise/entities/merchandise.entity';
import { Repository, Connection } from 'typeorm';
import { Class_Property } from './Entities/merchandise_class-property.entity';
import { CreatePropertyDto } from './dto/create-merchandise_class_property.dto';

@Injectable()
export class MerchandiseClassService {
  constructor(

    @InjectRepository(GoodsClass)
    private readonly Classrepo: Repository<GoodsClass>,
    @InjectRepository(Class_Property)
    private readonly Class_Propertyrepo: Repository<Class_Property>,
    private readonly connection: Connection,
  ) { }
  async createClass(createMerchandiseClassDto: CreateMerchandiseClassDto) {
    try {
      const NewClass= new GoodsClass ()
      NewClass.name =createMerchandiseClassDto.name
      return await this.Classrepo.save(NewClass)
    } catch (error) {
      
    }
    return 'This action adds a new merchandiseClass';
  }
  async createProperty(createPropertydto : CreatePropertyDto){
    try {
      const NewClassProperty= new Class_Property ()
      NewClassProperty.name =createPropertydto.name
      return await this.Classrepo.save(NewClassProperty)
    } catch (error) {
      
    }

  }

  async findAllClass() {
    try {
      return await this.Classrepo.find({
         
       })
     } catch (error) {
       
     }
  }
  async findAllClassProperty() {
    try {
      const Allclass = await this.Classrepo.find({
         relations : ['Class_Property']})
      const AllProperties = [];
      Allclass.map((Class) => { 
        Class.Class_Property.map((Property) => {
          AllProperties.push(Property) 
        })
      })
      return AllProperties
     } catch (error) {
       
     }
  }

  async findOneClass(ClassName: string) {
    try {
      const Class = await  this.Classrepo.findOne({
        where : {name : ClassName} ,
        relations : ['Class_Property']
      })
      return Class
    } catch (error) {
      
    }
  }
  async findPropertyofOneClass(ClassName: string) {
    try {
      const Class = await  this.Classrepo.findOne({
        where : {name : ClassName} ,
        relations : ['Class_Property']
      })
      return Class.Class_Property
    } catch (error) {
      
    }
  }

  async update(updateMerchandiseClassDto: UpdateMerchandiseClassDto) {
    try {
      
    } catch (error) {
      
    }
  }

  async remove(ClassName: string) {
    try {
      const ClasstoKill = await this.Classrepo.findOne({ where: { name: ClassName } })
      return await this.Classrepo.remove(ClasstoKill)
    } catch (error) {
      
    }
  }
}
