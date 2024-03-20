import { Injectable } from '@nestjs/common';
import { CreateRouterDbDto } from './dto/create-router-db.dto';
import { UpdateRouterAccessDto } from './dto/update-router-db.dto';
import { RouterDb } from './entities/router-db.entity';
import { Connection, Repository, TreeRepository, FindTreeOptions, getTreeRepository } from 'typeorm';
import { InjectEntityManager, InjectRepository, } from '@nestjs/typeorm';
import { Role } from 'src/users/entities/role.entity';

@Injectable()
export class RouterDbService {


  private RouterDbrepo
  constructor(


    private readonly connection: Connection,
    @InjectEntityManager()
    private readonly RouterDbrepoManager,
    //
    @InjectRepository(Role)
    private readonly Rolerepo : Repository<Role>,

    //: Tree ,

  ) {
    this.RouterDbrepo = this.RouterDbrepoManager.getTreeRepository(RouterDb)
  }

  checkRoleName(role: Role, name: string) {
    return role.name == name;
  }

  findPermittedChildren(roles: string[], children: RouterDb[]): RouterDb[] {
    let Roots = []
    children.map(
      (route) => {
        route.AccessableRole.map(
          (AR) => {
            //console.log(route)
            if (roles.includes(AR.name)) {
              route.children = this.findPermittedChildren(roles, route.children)
              Roots.push(route)
            }

          }
        )
      }
    )
    return Roots
  }


  async FindAllPlainRouters() : Promise<RouterDb[]>{
    return await this.RouterDbrepo.find({
    relations: ['AccessableRole']
    })
  }
  async AddRoutes(CreateRouterDbDto: CreateRouterDbDto) {

    try {
      if (!CreateRouterDbDto.fathername) {
        let router = new RouterDb()
        router.name = CreateRouterDbDto.name
        await this.RouterDbrepoManager.save(router)
      }
      else {
        const Father = await this.RouterDbrepo.findOne({ where: { name: CreateRouterDbDto.fathername } })
        let router = new RouterDb()
        router.name = CreateRouterDbDto.name
        router.parent = Father
        this.RouterDbrepoManager.save(router)
      }
    } catch (error) {
      throw error
    }

  }

  async findAllRoutesByRoles(roles) {
    let R = []
    const AllRouters = await this.RouterDbrepo.findTrees({ relations: ['AccessableRole'] })
    AllRouters.map(
      route => {
        route.AccessableRole.map(
          (AR) => {
            //console.log(roles)
            if (roles.roles.includes(AR.name)) { R.push(route) }

          }
        )

      }
    )

    return R
  }

  async findAllByRoles(roles): Promise<RouterDb[]> {
    try {
      const AllRouters = await this.RouterDbrepo.findTrees({
        relations: ['AccessableRole']
      })
      console.log(roles)
      const Router: RouterDb[] = this.findPermittedChildren(roles.roles, AllRouters)
      console.log(Router)
      return Router


    } catch (error) {

    }

  }

  async findAllRouter() {

    return await this.RouterDbrepo.findTrees({
      relations: ['AccessableRole']
    })
  }

  async ModifyAccess(UpdateRouterAccessDto : UpdateRouterAccessDto) {
    try {
      const AllRouters : RouterDb[]=await  this.FindAllPlainRouters()
      let newAccessRouter = []
      const Role = await this.Rolerepo.findOne({where : {name : UpdateRouterAccessDto.rolename} , relations :
      ['AccessableRouter']
      })
      AllRouters.map(
        (router)=> {
          if(UpdateRouterAccessDto.RouterNames.includes(router.name)){
            newAccessRouter.push(router)
          }
        }
      )
      Role.name = UpdateRouterAccessDto.newName
      Role.AccessableRouter = newAccessRouter
      return await this.Rolerepo.save(Role)
      // AllRouters.map(
      //   router => {
      //     let RolesOfRouter=[]
      //     router.AccessableRole.forEach(
      //       (role) => {RolesOfRouter.push(role.name)}
      //     )
      //     if(UpdateRouterAccessDto.RouterNames.includes(router.name))
      //     {
      //       if()
      //     }
      //   }
      // )
    } catch (error) {
      
    }
  }
}

