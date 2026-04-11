import { serverEnv } from '@/lib/env/server'
import { defineConfig } from 'drizzle-kit'

const caCert = serverEnv.DATABASE_CA_CERT.replace(/\\n/g, '\n')

export default defineConfig({
  out: './src/lib/drizzle/migrations',
  schema: './src/lib/drizzle/schemas/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    host: serverEnv.DATABASE_HOST,
    port: parseInt(serverEnv.DATABASE_PORT),
    user: serverEnv.DATABASE_USER,
    password: serverEnv.DATABASE_PASSWORD,
    database: serverEnv.DATABASE_NAME,
    ssl: {
      ca: caCert,
      rejectUnauthorized: true,
    },
  },
})
