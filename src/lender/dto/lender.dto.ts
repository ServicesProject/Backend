import { UserDto } from "src/user/dto/user.dto";
import { WorkDto } from "src/work/dto/work.dto";


export class LenderDto extends UserDto{

    works?: WorkDto[];
}