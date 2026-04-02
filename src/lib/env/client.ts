import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const clientEnv = createEnv({
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string().trim().min(1),
  },
  emptyStringAsUndefined: true,
  runtimeEnvStrict: import.meta.env,
  clientPrefix: 'VITE_',
})
