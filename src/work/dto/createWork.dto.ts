import { IsNotEmpty } from "class-validator";
import { WorkDto } from "./work.dto";


export class CreateWorkDto extends WorkDto{

    @IsNotEmpty()
    lenderEmail?: string
}