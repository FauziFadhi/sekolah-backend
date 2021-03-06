import { Module } from '@nestjs/common';

import { ClassModule } from './class/class.module';

@Module({
  controllers: [],
  imports: [ClassModule]
})
export class BackofficeModule { }
