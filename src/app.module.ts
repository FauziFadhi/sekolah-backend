import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CmsModule } from './modules/cms/cms.module';
import { BackofficeModule } from './modules/backoffice/backoffice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CmsModule,
    BackofficeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
