
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'notification'})
export class NotificationEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    message: string;

    @Column({ default: 'pendiente' })
    state: string;

    @Column({type: 'int', nullable:false})
    userId: number

    @Column({type: 'varchar', length:40, nullable:false})
    lenderEmail: string

    @Column({type: 'int', nullable:false})
    workId: number
}