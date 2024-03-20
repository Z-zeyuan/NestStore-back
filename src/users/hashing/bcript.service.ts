import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcriptService implements HashingService{
    async hash(data: string | Buffer): Promise<string> {
        const salt = await genSalt() 
        return hash(data , salt)
    }
    async compare(data: string | Buffer, encrypted: string): Promise<Boolean> {
        return compare(data , encrypted)
    }
}
