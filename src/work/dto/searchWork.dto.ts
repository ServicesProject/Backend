import { Transform } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"


export class searchWorks{
   
    category?: string
    experience?: string
    contract?: string
    area?: string
    workTime?: string
}