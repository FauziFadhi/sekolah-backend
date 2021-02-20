import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UAuthJwtStrategy } from './strategy/auth.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, UAuthJwtStrategy],
  exports: [AuthService, UAuthJwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
