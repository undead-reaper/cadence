import { serverEnv } from '@/lib/env/server'
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle(serverEnv.DATABASE_URL)
