import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const serverEnv = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']),
    CLERK_SIGN_IN_URL: z.string(),
    CLERK_SIGN_UP_URL: z.string(),
    CLERK_SIGN_IN_FORCE_REDIRECT_URL: z.string(),
    CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string(),
    DATABASE_URL: z.string(),
  },
  emptyStringAsUndefined: true,
  runtimeEnvStrict: process.env,
})
