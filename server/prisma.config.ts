import path from 'path';
import 'dotenv/config';
import type { PrismaConfig } from 'prisma';

export default {
  schema: path.join(__dirname, 'prisma'),
  migrations: {
    seed: 'ts-node src/prisma/seed.ts',
  },
} satisfies PrismaConfig;
