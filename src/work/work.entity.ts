import { type } from "os"
import { LenderEntity } from "src/lender/lender.entity"
import { UserEntity } from "src/user/user.entity"
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'work'})
export class WorkEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length:50, nullable:false})
    category: string

    @Column({type: 'varchar', length:50, nullable:false})
    salary: string

    @Column({type: 'varchar', length:50, nullable:false})
    job: string

    @Column({type: 'varchar', length:50, nullable:false})
    experience: string

    @Column({type: 'varchar', length:50, nullable:false})
    contract: string

    @Column({type: 'varchar', length:50, nullable:false})
    area: string

    @Column({type: 'varchar', length:200, nullable:false})
    address: string

    @Column({type: 'varchar', length:50, nullable:false})
    workTime: string

    @Column({ type: 'date' })
    creationDate: Date;
    
    //coordinates

    @Column({type: 'varchar', length:50, nullable:false})
    lat:string
    @Column({type: 'varchar', length:50, nullable:false})
    lng: string;

    @ManyToOne(() => LenderEntity, (lender) => lender.works)
    lender: LenderEntity;
}