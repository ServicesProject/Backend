import { IsNotEmpty, IsString } from "class-validator";

export class ValidateDto{
    @IsString()
    @IsNotEmpty()
    email?:string
}