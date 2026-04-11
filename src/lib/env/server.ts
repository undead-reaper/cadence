import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const serverEnv = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string().trim().min(1),
    NODE_ENV: z.enum(['development', 'production', 'test']),
    CLERK_SIGN_IN_URL: z.string().trim().min(1),
    CLERK_SIGN_UP_URL: z.string().trim().min(1),
    CLERK_SIGN_IN_FORCE_REDIRECT_URL: z.string().trim().min(1),
    CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string().trim().min(1),
    DATABASE_HOST: z.string().trim().min(1),
    DATABASE_PORT: z.string().trim().min(1),
    DATABASE_USER: z.string().trim().min(1),
    DATABASE_PASSWORD: z.string().trim().min(1),
    DATABASE_NAME: z.string().trim().min(1),
    DATABASE_CA_CERT: z.string().trim().min(1),
    R2_ACCOUNT_ID: z.string().trim().min(1),
    R2_ACCESS_KEY_ID: z.string().trim().min(1),
    R2_SECRET_ACCESS_KEY: z.string().trim().min(1),
    R2_BUCKET_NAME: z.string().trim().min(1),
    HF_TOKEN: z.string().trim().min(1),
    CHATTERBOX_API_KEY: z.string().trim().min(1),
    CHATTERBOX_API_URL: z.string().trim().min(1),
  },
  emptyStringAsUndefined: true,
  runtimeEnvStrict: process.env,
})
