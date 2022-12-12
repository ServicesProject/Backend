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
    constructor(@InjectRepository(TokenEntity) private UserRepository: Repository<TokenEntity>){
    }

    getToken(user:UserEntity){
        let privateKey = this.getPrivateKey();
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            sub: user.id,
            iat: now,
            jti: uuid.v4(),
            role: user.rol,
            email: user.email,
            exp: now + 864000,
            iss: "http://localhost:4200/"
        }
        return jwt.sign(payload, "secret", function(err,token){
            if (err) {
                console.log(err);
            } else {
                console.log(token);
            }
        })  
    }    


    getPrivateKey() {
        try {
          const keyPath = path.resolve(
            path.dirname(path.dirname(__dirname)),
            './src/security/jwtRS256.key',
          );
          return fs.readFileSync(keyPath);
        } catch (error) {
          throw error.message;
        }
      }
}
