import { Column, PrimaryGeneratedColumn } from "typeorm"

export class BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: true ,type: 'varchar', length:50})
    name: string
    @Column({nullable: true, type: 'varchar', length:50})
    lastName: string
    @Column({nullable: true,type: 'varchar'})
    phone: string
    
    @Column({nullable: true,type: 'varchar', length:50})
    gender:string

    @Column({nullable: true,type: 'varchar'})
    ci:string
    @Column({nullable: true, type: 'date' })
    birthdate: Date;

    @Column({nullable: true,type:'boolean'})
    complete: boolean
   
    @Column({type: 'varchar', length:40, nullable:false, unique:true})
    email: string
}