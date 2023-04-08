import { Module } from '@nestjs/common';

import { SharedUsersModule } from 'src/shared/shared-users/shared-users.module';


@Module({
  imports: [
  SharedUsersModule
],
  
})
export class UserModule {
  

}
