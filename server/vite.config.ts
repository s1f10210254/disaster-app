import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { S3_BUCKET } from './service/envValues';

dotenv.config();

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    env: {
      S3_BUCKET: `${S3_BUCKET}-test`,
      DATABASE_URL: process.env.DATABASE_URL?.replace(/[^/]+$/, 'test') ?? '',
    },
    setupFiles: ['tests/setup.ts'],
    includeSource: ['**/*.ts'],
    // include: ['**/index.test.ts'],
    poolOptions: { forks: { singleFork: true } },
    hookTimeout: 100000,
    testTimeout: 10000,
    coverage: {
      thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
      include: ['api/**/{controller,hooks,validators}.ts', 'domain/**'],
      exclude: ['domain/**/model/*Entity.ts'],
    },
  },
});
