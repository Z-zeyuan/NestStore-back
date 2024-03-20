import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"
import { Permission } from "../permission/entities/permission.entity"
import { RouterDb } from "src/router-db/entities/router-db.entity"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @ManyToMany(type => User , (User) => User.roles )
    User : User[]


    @JoinTable()
    @ManyToMany(type => Permission , (Permission) => Permission.Role 
    ,{cascade : true})
    Permission : Permission[]


    @JoinTable()
    @ManyToMany(type => RouterDb , (AccessableRouter) => AccessableRouter.AccessableRole 
    ,{cascade : true})
    AccessableRouter : RouterDb[]

}
