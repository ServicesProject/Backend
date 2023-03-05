import { BaseEntity } from "src/base/base.entity";
import { WorkEntity } from "src/work/work.entity";
import { Entity, OneToMany } from "typeorm";

@Entity({name: 'lender'})
export class LenderEntity extends BaseEntity{

    @OneToMany(() => WorkEntity, (works) => works.lender)
    works: WorkEntity[];
}