import { Transform } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"


export class searchWorks{
   
    category?: string
    job?: string
    experience?: string
    contract?: string
    area?: string
    workTime?: string
}