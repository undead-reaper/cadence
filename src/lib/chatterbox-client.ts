import type { paths } from '@/features/text-to-speech/types/chatterbox-api'
import { serverEnv } from '@/lib/env/server'
import createClient from 'openapi-fetch'

export const chatterbox = createClient<paths>({
  baseUrl: serverEnv.CHATTERBOX_API_URL,
  headers: {
    'x-api-key': serverEnv.CHATTERBOX_API_KEY,
  },
})
