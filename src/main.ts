import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from 'components/utils/all-exception-filter';
import { ValidationPipe } from 'components/utils/ValidationPipe';
import { DB } from 'database/config';
import { install } from 'source-map-support';

import { AppModule } from './app.module';

async function bootstrap() {
  DB.addModels([`${__dirname}/models`])

  const app = await NestFactory.create(AppModule);
  install();

  // DB.sync()
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    credentials: false,
  })

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api')

  await app.listen(3000);

}
bootstrap();
