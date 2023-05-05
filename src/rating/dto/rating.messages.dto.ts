import { UserEntity } from "src/user/user.entity"

export class RatingMessagesDto{
    user: UserEntity
    idWork: number
    point:number
    message:string
}