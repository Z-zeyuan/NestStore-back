import { Role } from "src/users/entities/role.entity"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Permission {


    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @ManyToMany(type => Role , (Role) => Role.Permission )
    Role : Role[]
}
