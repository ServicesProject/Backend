
import { UserEntity } from "src/user/user.entity";
import { WorkEntity } from "src/work/work.entity";


export class NotificationWorkUserDto{

    message: string;

    state:string

    user: UserEntity

    lenderEmail: string

    work: WorkEntity
}
