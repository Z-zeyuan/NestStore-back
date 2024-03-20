
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, Unique } from "typeorm";
import { Deal } from "./Deal.entity";
import { Goods } from "src/merchandise/entities/merchandise.entity";



@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    totalprice: number
    @Column()
    GoodNum: number
    @Column()
    status : boolean

    @JoinTable()
    @ManyToOne(type => Deal , (Deal) => Deal.Orders ,{cascade : true})
    Deal: Deal;

    @JoinTable()
    @ManyToOne(type => Goods , (Good) => Good.Orders   ,{cascade : true}) 
    Goods: Goods
}
