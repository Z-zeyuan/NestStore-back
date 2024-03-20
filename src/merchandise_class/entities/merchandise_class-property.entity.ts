import { Goods } from "src/merchandise/entities/merchandise.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { GoodsClass } from "./merchandise_class.entity";


@Unique(['name'])
@Entity()
export class Class_Property {
    @PrimaryGeneratedColumn()
    id : number

    
    @Column() 
    name : string

    @ManyToOne(type => GoodsClass , (GoodsClass) => GoodsClass.Class_Property )
    GoodsClass: GoodsClass;





}
