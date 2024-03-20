import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./role.entity";
import { ApiKey } from "./api-ket.entity/api-key.entity";
import { Deal } from "src/order/entities/Deal.entity";


@Entity()
@Unique(['name'])
export class User {
    @PrimaryGeneratedColumn()
    id : number

    
    @Column() 
    name : string

    @Column()
    password : string

    @JoinTable()
    @ManyToMany(type => Role , (roles) => roles.User 
    ,{cascade : true})
    roles : Role[]

    @JoinTable()
    @OneToMany(type => ApiKey , (ApiKeys) => ApiKeys.User 
    ,{cascade : true})
    ApiKeys : ApiKey[]


    @OneToMany(type => Deal , (Deal) => Deal.User )
    Deals : Deal[]
}
