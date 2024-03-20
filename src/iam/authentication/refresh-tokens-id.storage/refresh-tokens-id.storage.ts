import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import Redis from "ioredis";







export class InvalidRefreshTokenErr{}





@Injectable()
export class RefreshTokensIdStorage implements OnApplicationBootstrap , OnApplicationShutdown {
    private redisClient: Redis;
    onApplicationBootstrap() {
       
        this.redisClient = new Redis({
            host : 'localhost' ,
            port : 6379
        })








    }
    onApplicationShutdown(signal?: string) {
        return this.redisClient.quit()
    }





    async insert(userId : number , tokenId : string) : Promise<void>{
        await this.redisClient.set(this.getKey(userId), tokenId)
    }

    async validate(userId : number , tokenId : string): Promise<boolean>{
        //console.log(await this.redisClient.get(this.getKey(userId)))
        const StoredId = await this.redisClient.get(this.getKey(userId))
        if(StoredId !==tokenId){throw new InvalidRefreshTokenErr()}
        return StoredId ===tokenId
    }

    async invalidate(userId : number ) : Promise<void>{
        await this.redisClient.del(this.getKey(userId))
    }

    private getKey(userId : number ) : string{
        return `user-${userId}`
    }
}
