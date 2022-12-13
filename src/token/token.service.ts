import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { TokenEntity } from './token.entity';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class TokenService {
    constructor(@InjectRepository(TokenEntity) private tokenRepository: Repository<TokenEntity>){
    }

    getToken(user:UserEntity){
        let privateKey = this.getPrivateKey();
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            iat: now,
            exp: now + 864000,
            user: user
        }
        return jwt.sign(payload, privateKey, {algorithm: 'RS256'})
    }    


    getPrivateKey() {
        try {
          const keyPath = path.resolve(
            path.dirname(path.dirname(__dirname)),
            './src/security/private.pem',
          );
          return fs.readFileSync(keyPath);
        } catch (error) {
          throw error.message;
        }
      }

      validateToken(token: string) {
        return jwt.verify(
          token,
          this.getPublicKey(),
          { algorithms: ['RS256'] },
          function (err, decoded) {
            return {err, decoded}
          },
        );
      }

      getPublicKey() {
        try {
          const keyPath = path.resolve(
            path.dirname(path.dirname(__dirname)),
            './src/security/public.pem',
          );
          return fs.readFileSync(keyPath);
        } catch (error) {
          throw error.message;
        }
      }

}
