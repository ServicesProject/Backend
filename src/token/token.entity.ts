import { BaseEntity } from "src/shared/base.entity";
import { UserEntity } from "src/user/user.entity";
import {Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";


@Entity({name: 'token'})
export class TokenEntity extends BaseEntity{

  @Column({ name: 'value' })
  @Generated("uuid")
  value: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'expiration_date',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  expirationDate: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserEntity, (user) => user.tokens)
  user: UserEntity;
}