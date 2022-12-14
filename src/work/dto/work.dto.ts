import { Transform } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"

export class WorkDto{
    id?:number

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
}