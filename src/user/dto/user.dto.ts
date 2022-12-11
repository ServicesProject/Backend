import { Transform } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"



export class UserDto{
    id?:number
    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    name?:string

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    lastName?:string

    @IsString()
    @IsNotEmpty()
    phone?:string

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    description?: string

    @IsString()
    @IsNotEmpty()
    gender?:string
}