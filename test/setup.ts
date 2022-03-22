import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

// close connection after each test so that the delete function can happen
global.afterEach(async () => {
  const conn = getConnection();
  await conn.close();
});
