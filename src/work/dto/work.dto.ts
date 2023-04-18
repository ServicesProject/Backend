import { Transform } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"


export class WorkDto{
   
    id?:number

    @IsString()
    @IsNotEmpty()
    category?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    salary?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    job?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    experience?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    contract?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    area?: string

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    address?: string

    @IsString()
    @IsNotEmpty()
    workTime?: string

    creationDate: Date

    @Transform(({value}): string => value?.trim())
    description?: string

    //coordinates
    
    @IsNotEmpty()
    lat: string;
    @IsNotEmpty()
    lng: string;
}