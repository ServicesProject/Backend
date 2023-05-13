import { LenderEntity } from "src/lender/lender.entity"
import { RatingEntity } from "src/rating/rating.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date;

    @Column({type: 'varchar', length:200})
    description: string
    
    //coordinates

    @Column({type: 'varchar', length:50, nullable:false})
    lat:string
    @Column({type: 'varchar', length:50, nullable:false})
    lng: string;

    @ManyToOne(() => LenderEntity, (lender) => lender.works)
    lender: LenderEntity;

    @OneToMany(() => RatingEntity, (rating) => rating.work)
    rating: RatingEntity
}