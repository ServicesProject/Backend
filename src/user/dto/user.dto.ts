import { Transform } from "class-transformer"
import { IsIn, IsNotEmpty, IsString } from "class-validator"
import { RolType } from "src/rol/rol.enum"

export class UserDto{
    id?:number
    
    @Transform(({value}): string => value?.trim())
    name?:string

    lastName?:string

    phone?:string

    @Transform(({value}): string => value?.trim())
    description?: string

    gender?:string

    ci:string

    birthdate: Date

    complete?: boolean

    accountConfirmed?: boolean

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