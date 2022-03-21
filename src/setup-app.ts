/* eslint-disable @typescript-eslint/no-var-requires */
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session'); // due to compatibility

// *** Hack for setting up global middleware for e2e testing

export const setupApp = (app: any) => {
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
};
