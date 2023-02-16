import { UserEntity } from "src/user/user.entity";
import { WorkEntity } from "src/work/work.entity";
import { Entity, OneToMany } from "typeorm";

@Entity({name: 'lender'})
export class LenderEntity extends UserEntity{

    @OneToMany(() => WorkEntity, (works) => works.lender)
    works: WorkEntity[];
}