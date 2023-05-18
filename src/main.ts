import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

function setUpConfigs(app: INestApplication) {
  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: process.env.NODE_ENV === 'development',
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setUpConfigs(app);
  await app.listen(3000);
}

bootstrap();
