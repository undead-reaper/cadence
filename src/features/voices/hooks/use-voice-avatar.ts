import { glass } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { useMemo } from 'react'

type UseVoiceAvatarProps = {
  seed: string
}
export const useVoiceAvatar = ({ seed }: UseVoiceAvatarProps) => {
  return useMemo(() => {
    return createAvatar(glass, { seed, size: 128 }).toDataUri()
  }, [seed])
}
