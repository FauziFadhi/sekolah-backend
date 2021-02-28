import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DmModule } from 'modules/_dm/_dm.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { ClassesModule } from './modules/classes/classes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    StudentModule,
    TeacherModule,
    DmModule,
    ClassesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
