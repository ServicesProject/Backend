import { Column, PrimaryGeneratedColumn } from "typeorm"

export class BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'varchar', length:50})
    name: string
    @Column({type: 'varchar', length:50})
    lastName: string
    @Column({type: 'varchar'})
    phone: string
    @Column({type: 'varchar', length:200})
    description: string
    @Column({type: 'varchar', length:50})
    gender:string

    @Column({type: 'varchar'})
    ci:string
    @Column({ type: 'date' })
    birthdate: Date;

    @Column({type: 'varchar', length:40, nullable:false, unique:true})
    email: string
}