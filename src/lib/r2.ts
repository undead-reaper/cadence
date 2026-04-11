import { serverEnv } from '@/lib/env/server'
import { S3Client } from 'bun'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${serverEnv.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: serverEnv.R2_ACCESS_KEY_ID,
  secretAccessKey: serverEnv.R2_SECRET_ACCESS_KEY,
  bucket: serverEnv.R2_BUCKET_NAME,
})

type AudioBufferOptions = {
  buffer: Buffer
  key: string
  contentType?: 'audio/wav'
}

export const uploadAudio = ({
  buffer,
  key,
  contentType,
}: AudioBufferOptions): Promise<number> => {
  return r2.file(key).write(buffer, { type: contentType })
}

export const deleteAudio = ({ key }: { key: string }): Promise<void> => {
  return r2.file(key).delete()
}

export const getSignedAudioUrl = async ({
  key,
}: {
  key: string
}): Promise<string> => {
  return r2.file(key).presign({ expiresIn: 3600, method: 'GET' })
}
