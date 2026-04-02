import type { VoiceName } from '@/features/voices/data/voice-metadata'
import { SystemVoiceMetadata } from '@/features/voices/data/voice-metadata'
import { CANONICAL_SYSTEM_VOICE_NAMES } from '@/features/voices/data/voice-scoping'
import { db } from '@/lib/drizzle'
import { voices } from '@/lib/drizzle/schemas/voice'
import { uploadAudio } from '@/lib/r2'
import { and, eq } from 'drizzle-orm'
import path from 'node:path'

const SYSTEM_VOICES_DIR = path.resolve(import.meta.dir, '../data/assets')

const readSystemVoices = async (name: VoiceName) => {
  const filePath = path.join(SYSTEM_VOICES_DIR, `${name}.wav`)
  const arrayBuffer = await Bun.file(filePath).arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return { buffer, contentType: 'audio/wav' as const }
}

const seedSystemVoices = async (name: VoiceName) => {
  const { buffer, contentType } = await readSystemVoices(name)
  const existingSystemVoice = await db.query.voices.findFirst({
    where: and(eq(voices.variant, 'System'), eq(voices.name, name)),
    columns: { id: true },
  })
  if (existingSystemVoice) {
    const r2ObjectKey = `voices/system/${existingSystemVoice.id}`
    const meta = SystemVoiceMetadata[name]
    await uploadAudio({
      key: r2ObjectKey,
      buffer,
      contentType,
    })
    return await db
      .update(voices)
      .set({
        r2ObjectKey,
        category: meta.category,
        description: meta.description,
        language: meta.language,
      })
      .where(eq(voices.id, existingSystemVoice.id))
      .returning()
  } else {
    const meta = SystemVoiceMetadata[name]
    const voice = await db
      .insert(voices)
      .values({
        name,
        variant: 'System',
        organizationId: null,
        description: meta.description,
        category: meta.category,
        language: meta.language,
      })
      .returning({ id: voices.id })
    const r2ObjectKey = `voices/system/${voice[0].id}`
    try {
      await uploadAudio({
        key: r2ObjectKey,
        buffer,
        contentType,
      })
      await db
        .update(voices)
        .set({ r2ObjectKey })
        .where(eq(voices.id, voice[0].id))
    } catch (error) {
      await db.delete(voices).where(eq(voices.id, voice[0].id))
      console.error(`Failed to upload audio for voice ${name}:`, error)
    }
  }
}

const main = async () => {
  console.log(`Seeding ${CANONICAL_SYSTEM_VOICE_NAMES.length} system voices...`)
  for (const name of CANONICAL_SYSTEM_VOICE_NAMES) {
    console.log(`Seeding voice: ${name}`)
    await seedSystemVoices(name)
  }
  console.log('Seeding completed.')
  process.exit(0)
}

main().catch((error) => {
  console.error('Error seeding system voices:', error)
  process.exit(1)
})
