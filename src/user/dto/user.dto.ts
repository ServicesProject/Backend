import { Transform } from "class-transformer"
import { IsIn, IsNotEmpty, IsString } from "class-validator"
import { RolType } from "src/rol/rol.enum"

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

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    email?:string

    @IsString()
    @Transform(({value}): string => value?.trim())
    @IsNotEmpty()
    password?:string

    @IsIn([RolType.USER,RolType.WORKER])
    @IsNotEmpty()
    rol?: RolType
}