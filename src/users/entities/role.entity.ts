import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @ManyToMany(type => User , (User) => User.Role )
    User : User[]
}
