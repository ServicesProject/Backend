import { BaseEntity } from "src/shared/base.entity";
import { UserEntity } from "src/user/user.entity";
import {Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";


@Entity({name: 'token'})
export class TokenEntity extends BaseEntity{

  @Column({ name: 'value' })
  @Generated("uuid")
  value: string;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP + INTERVAL '1 month'",
  })
  expirationDate: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserEntity, (user) => user.tokens)
  user: UserEntity;
}