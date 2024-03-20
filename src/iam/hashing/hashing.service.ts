import { Injectable } from '@nestjs/common';
import { promises } from 'dns';

@Injectable()
export abstract class HashingService {
    abstract hash(data : string |Buffer) : Promise<String>
    abstract compare(data : string |Buffer , encrypted : string)  : Promise<Boolean>
}
