import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TokenService } from "src/token/token.service";
import { UserModule } from "src/user/user.module";
import { TokenGuard } from "./token.guard";
import { SharedUsersModule } from "src/shared/shared-users/shared-users.module";

@Module({
    imports: [SharedUsersModule],
    providers: [
      {
        provide: APP_GUARD,
        useClass: TokenGuard,
      }
    ],
  })
  export class GuardModule {}