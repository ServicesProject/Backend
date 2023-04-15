import { UserEntity } from "src/user/user.entity";
import { WorkEntity } from "src/work/work.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'rating'})
export class RatingEntity{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => WorkEntity, (work) => work.rating)
    work: WorkEntity

    @Column({type: 'int', nullable:false})
    userId: number

    @Column({type: 'int', nullable:false})
    point: number

    @Column({type: 'varchar', length:200, nullable:false})
    message: string
}