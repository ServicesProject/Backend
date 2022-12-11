import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'work'})
export class WorkEntity{
    @PrimaryGeneratedColumn()
    id: number
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
}