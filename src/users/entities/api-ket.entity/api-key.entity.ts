import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../user.entity"

@Entity()
export class ApiKey {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column()
    UUID : string

    @ManyToOne(type => User , (User) => User.ApiKeys )
    User : User[]

}
