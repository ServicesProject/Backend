import { RolType } from "src/rol/rol.enum"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'user'})
export class UserEntity{
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

    @Column({type:'boolean'})
    complete: boolean


    @Column({type: 'varchar', length:40, nullable:false, unique:true})
    email: string
    @Column({type: 'varchar',nullable:false})
    password:string
    @Column({type: 'enum',nullable:false, enum: RolType})
    rol: RolType
}