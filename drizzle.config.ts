import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/lib/drizzle/migrations',
  schema: './src/lib/drizzle/schemas/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
