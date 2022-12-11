import { RolType } from "src/rol/rol.enum"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'user'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'varchar', length:50, nullable:false})
    name: string
    @Column({type: 'varchar', length:50, nullable:false})
    lastName: string
    @Column({type: 'varchar', nullable:false})
    phone: string
    @Column({type: 'varchar', length:200, nullable:false})
    description: string
    @Column({type: 'varchar', length:50, nullable:false})
    gender:string

    @Column({type: 'varchar', length:40, nullable:false, unique:true})
    email: string
    @Column({type: 'varchar',nullable:false})
    password:string
    @Column({type: 'enum',nullable:false, enum: RolType})
    rol: RolType
}