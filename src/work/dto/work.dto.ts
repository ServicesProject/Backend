import { Transform } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"


export class WorkDto{
   
    id?:number

    @IsString()
    category?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    salary?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    job?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    experience?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    contract?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    area?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    address?: string

    @IsString()
    workTime?: string

    creationDate: Date

    @IsString()
    description?: string

    //coordinates
    
    @IsNotEmpty()
    lat: string;
    @IsNotEmpty()
    lng: string;
}