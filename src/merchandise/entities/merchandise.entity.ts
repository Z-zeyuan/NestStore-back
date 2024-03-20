import { IsOptional } from "class-validator";
import { Json } from "sequelize/types/utils";
import { GoodsClass } from "src/merchandise_class/Entities/merchandise_class.entity";
import { Order } from "src/order/entities/Order.entity";
import { Column, Entity,GeoJSON,JoinTable,ManyToMany,ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { LongExtended } from "typeorm/driver/mongodb/bson.typings";


@Unique(['name'])
@Entity()
export class Goods {
    @PrimaryGeneratedColumn()
    id : number

    
    @Column() 
    name : string

    @Column()
    price : number

    @Column()
    SellAmount : number

    @Column()
    StockAmount : number

    
    @Column({nullable:true})
    LablePath : string

    @JoinTable()
    @ManyToOne(type => GoodsClass , (GoodsClass) => GoodsClass.Goods )
    GoodsClass: GoodsClass;


    @OneToMany(type => Order , (Order) => Order.Goods  )
    Orders: Order[];


    @Column({nullable: true}  )
    LablePicPath : string
    
    @Column({ type: "text" , nullable: true}  )
    GoodDetail : string


}
