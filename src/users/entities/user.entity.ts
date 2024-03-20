import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    password : string

    @JoinTable()
    @ManyToMany(type => Role , (Role) => Role.User 
    ,{cascade : true})
    Role : Role[]
}
