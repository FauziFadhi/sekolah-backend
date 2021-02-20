import { User } from '@models/User';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(): string {
    User.findOne()
    return this.appService.getHello();
  }
}
