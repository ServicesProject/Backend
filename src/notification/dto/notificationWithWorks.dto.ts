import { WorkDto } from "src/work/dto/work.dto";
import { WorkEntity } from "src/work/work.entity";


export class NotificationWithWorkDto{
   

    message: string;

    state:string

    userId: number

    lenderEmail: string

    work: WorkEntity
}
