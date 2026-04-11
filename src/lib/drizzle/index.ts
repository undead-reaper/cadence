import {
  generationRelations,
  generations,
} from '@/lib/drizzle/schemas/generations'
import { voices, voicesRelations } from '@/lib/drizzle/schemas/voice'
import { serverEnv } from '@/lib/env/server'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const caCert = serverEnv.DATABASE_CA_CERT.replace(/\\n/g, '\n')

const client = postgres({
  prepare: false,
  ssl: {
    ca: caCert,
    rejectUnauthorized: true,
  },
  host: serverEnv.DATABASE_HOST,
  port: parseInt(serverEnv.DATABASE_PORT),
  user: serverEnv.DATABASE_USER,
  password: serverEnv.DATABASE_PASSWORD,
  database: serverEnv.DATABASE_NAME,
})

export const db = drizzle(client, {
  schema: {
    voices,
    voicesRelations,
    generations,
    generationRelations,
  },
})
