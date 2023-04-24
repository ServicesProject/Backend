import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class NotificationDto{
   
    @IsString()
    message: string;

    state:string

    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsString()
    @IsNotEmpty()
    lenderEmail: string

    @IsNotEmpty()
    @IsNumber()
    workId: number
}
