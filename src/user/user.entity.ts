import { BaseEntity } from "src/base/base.entity"
import { RolType } from "src/rol/rol.enum"
import { TokenEntity } from "src/token/token.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'user'})
export class UserEntity extends BaseEntity{

    @Column({nullable: true,type:'boolean'})
    accountConfirmed: boolean
    @Column({type: 'varchar',nullable:false})
    password:string
    @Column({type: 'enum',nullable:false, enum: RolType})
    rol: RolType
    @OneToMany(() => TokenEntity, (token) => token.user, { cascade: true})
    tokens?: TokenEntity;
}