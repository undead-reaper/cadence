import type { CreateVoiceFormData } from '@/features/voices/types/createVoiceSchema'

type CreateVoiceArgs = Readonly<{
  data: CreateVoiceFormData
}>

export const createVoice = async ({ data }: CreateVoiceArgs) => {
  if (!data.file) {
    throw new Error('Audio file is required')
  }

  const params = new URLSearchParams({
    name: data.name,
    categories: data.category,
    language: data.language,
  })

  if (data.description) {
    params.set('description', data.description)
  }

  const response = await fetch(`/api/voices/create?${params.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': data.file.type,
    },
    body: data.file,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error ?? 'Failed to create voice')
  }

  return response.json()
}
