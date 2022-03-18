import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session'); // due to compatibility

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      keys: ['KrystalStar'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips out extra properties on req body
    }),
  );
  await app.listen(3000);
}
bootstrap();
