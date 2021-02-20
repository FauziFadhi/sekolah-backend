import {
  APP_NAME,
  AUTH_AUDIENCE,
  AUTH_PAYLOAD_ALGORITHM,
  AUTH_PAYLOAD_PASSWORD,
  AUTH_PAYLOAD_SALT,
  AUTH_PAYLOAD_SALT_ROUND,
} from '@constants/app';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {

  }

  async createToken(payload: any, key: string = this.configService.get('JWT_USER_SECRET_KEY'), audience: string = AUTH_AUDIENCE,
    expiresIn: number = this.configService.get('JWT_DEFAULT_EXPIRE_TIME'), issuer: string = APP_NAME) {

    const file = this.configService.get('JWT_KEY_FOLDER') + key;

    if (!fs.existsSync(file)) {
      throw new BadRequestException('Not Found!');
    }

    const algorithm = this.configService.get('JWT_ALGORITHM');

    const secretOrKey = fs.readFileSync(file);

    console.log(payload);
    const resPayload = JSON.parse(JSON.stringify(payload))
    const token = this.jwtService
      .sign(resPayload, { secret: secretOrKey, expiresIn: `${expiresIn}s`, algorithm, audience: await this.encrypt(audience), issuer });

    return { expiredIn: expiresIn, token };
  }

  encrypt(payload: string): Promise<string> {
    try {
      let result = null;
      const crypto = require('crypto');

      const key = crypto.scryptSync(AUTH_PAYLOAD_PASSWORD, AUTH_PAYLOAD_SALT, AUTH_PAYLOAD_SALT_ROUND);
      const iv = Buffer.alloc(16, 0); // Initialization vector.
      const cipher = crypto.createCipheriv(AUTH_PAYLOAD_ALGORITHM, key, iv);

      result = cipher.update(payload, 'utf8', 'hex');
      result += cipher.final('hex');

      return result
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  /**
   *
   * @param encrypted
   */
  static decrypt(encrypted: string): Promise<string> {
    try {
      const crypto = require('crypto');
      const key = crypto.scryptSync(AUTH_PAYLOAD_PASSWORD, AUTH_PAYLOAD_SALT, AUTH_PAYLOAD_SALT_ROUND);
      const iv = Buffer.alloc(16, 0); // Initialization vector.
      const decipher = crypto.createDecipheriv(AUTH_PAYLOAD_ALGORITHM, key, iv);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async compareHash(string: string | undefined, hash: string | undefined): Promise<boolean> {
    return bcrypt.compare(string, hash);
  }
}
