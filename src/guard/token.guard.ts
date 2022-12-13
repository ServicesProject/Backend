import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { TokenService } from "src/token/token.service";
import { Request } from 'express';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const authorizationHeader = request.header('Authorization');
        const classAuthorization = this.reflector.get<string[]>(
        'authorizationRequired',
        context.getHandler(),
        );

        if (!authorizationHeader) {
        if (!classAuthorization) {
            return true;
        }
        throw new UnauthorizedException(
            'Sorry we got a problem authorizing your request',
        );
        }
        const authorization = authorizationHeader
        ? authorizationHeader.split(' ')
        : null;
        if (
            authorization &&
            authorization[0] === 'Bearer' &&
            authorization.length === 2
          ) {
            const  decoded  = this.tokenService.validateToken(
              authorization[1],
            );
            if (decoded['err']) {
              throw new UnauthorizedException('Invalid or expired token');
            }
            request['jwt'] = decoded;
            return true;
          }
          throw new UnauthorizedException(
            'Sorry we got a problem authorizing your request',
          );
        }
        

}