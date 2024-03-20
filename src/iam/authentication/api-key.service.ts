import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { randomUUID } from 'crypto';

export interface GeneratedApiKeyPayload {
    apiKey: string,
    hashedKey : string
}




@Injectable()
export class ApiKeyService {
    constructor(private readonly HashingService : HashingService){}
    async createAndHash(id : number) : Promise<GeneratedApiKeyPayload>{
        const ApiKey = this.generateApiKey(id)
        const hashedKey = await this.HashingService.hash(ApiKey)

        return {apiKey:ApiKey,hashedKey : hashedKey}


    }
    async validate(apikey :string ,hashedkey : string) : Promise<Boolean>{
        return this.HashingService.compare(apikey,hashedkey)
    }
     extractIdFroKey(apikey :string ):string{
        return ''
     }
    private generateApiKey(id : number):string{
        const Api_Key = `${id}   ${randomUUID()}`

        return Buffer.from(Api_Key).toString('base64')


    }
}
