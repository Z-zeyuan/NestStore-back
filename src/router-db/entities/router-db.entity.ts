import { Role } from "src/users/entities/role.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, Unique } from "typeorm";

@Unique(['name'])
@Entity()
@Tree("materialized-path")

export class RouterDb {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToMany(type => Role , (Role) => Role.AccessableRouter )
    AccessableRole : Role[]

    @Column() 
    name : string

    @TreeChildren()
    children: RouterDb[];

    @TreeParent()
    parent: RouterDb;
}
