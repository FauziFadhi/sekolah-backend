import { AuthService } from '@auth/auth.service';
import { APP_NAME, AUTH_AUDIENCE } from '@constants/app';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as fs from 'fs';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class UAuthJwtStrategy extends PassportStrategy(Strategy, 'uauth') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: configService.get('JWT_ALGORITHM'),
      audience: authService.encrypt(AUTH_AUDIENCE),
      issuer: APP_NAME,
      secretOrKey: fs.readFileSync(configService.get('JWT_KEY_FOLDER') + configService.get('JWT_USER_PUBLIC_KEY')),
    });
  }

  async validate(payload: any) {
    // const userLoginRepo = RepositoriesModule.moduleRef.get(UserLoginRepository)
    // const userLogin = await userLoginRepo.findByIdCache(payload.loginId)

    // if (userLogin.tokenCode != payload.tokenCode) throw new UnauthorizedException()
    return payload
  }
}
