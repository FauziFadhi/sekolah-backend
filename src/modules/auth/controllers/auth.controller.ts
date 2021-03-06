import { AuthService } from '@auth/auth.service';
import * as PayloadConstruct from '@auth/payload/payload.base';
import { ERROR_MSG } from '@constants/error-message';
import { UserLogin } from '@models/UserLogin';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {

  }

  @Post('login')
  async login(@Body() body: any) {

    const userLogin = await UserLogin.findOne({
      where: {
        isDeleted: false,
        username: body.username
      }
    })
    if (!userLogin) throw new UnauthorizedException(ERROR_MSG.INVALID_CRED)


    // const isPasswordMatch = await this.authService.compareHash(body.password, userLogin.password)
    // if (!isPasswordMatch) throw new UnauthorizedException(ERROR_MSG.INVALID_CRED)

    const payload = PayloadConstruct.construct(userLogin.role, userLogin)

    return await this.authService.createToken(payload)
  }
}
