import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const clientEnv = createEnv({
  client: {
    VITE_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  emptyStringAsUndefined: true,
  runtimeEnvStrict: import.meta.env,
  clientPrefix: 'VITE_',
})
