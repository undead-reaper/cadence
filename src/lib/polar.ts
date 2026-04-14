import { serverEnv } from '@/lib/env/server'
import { Polar } from '@polar-sh/sdk'

export const polar = new Polar({
  server: serverEnv.POLAR_SERVER_MODE,
  accessToken: serverEnv.POLAR_ACCESS_TOKEN,
})
