import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const cookieSession = require('cookie-session'); // due to compatibility

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // moved to app.module.ts for better testing experience
  // app.use(
  //   cookieSession({
  //     keys: ['KrystalStar'],
  //   }),
  // );

  // moved to app.module.ts for better testing experience
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // strips out extra properties on req body
  //   }),
  // );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
