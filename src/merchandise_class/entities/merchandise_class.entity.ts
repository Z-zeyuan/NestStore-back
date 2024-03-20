import { Goods } from "src/merchandise/entities/merchandise.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Class_Property } from "./merchandise_class-property.entity";


@Unique(['name'])
@Entity()
export class GoodsClass {
    @PrimaryGeneratedColumn()
    id : number

    
    @Column() 
    name : string

    @OneToMany(type => Goods , (Goods) => Goods.GoodsClass 
    ,{cascade : true})
    Goods: Goods[];


    @JoinTable()
    @OneToMany(type => Class_Property , (Class_Property) => Class_Property.GoodsClass 
    ,{cascade : true})
    Class_Property: Class_Property[];





}
