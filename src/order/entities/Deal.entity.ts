
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, Unique } from "typeorm";
import { Order } from "./Order.entity";



@Entity()
export class Deal {
    @PrimaryGeneratedColumn()
    id: number
    
    @JoinTable()
    @ManyToOne(type => User , (User) => User.Deals )
    User: User;

    @Column()
    totalprice: number

    @OneToMany(type => Order , (Order) => Order.Deal )
    Orders : Order[]
    

    @Column({ type: 'timestamptz', nullable: false, default: () => 'NOW()' })
    transactionTime: Date;

    @Column()
    status : boolean


}
