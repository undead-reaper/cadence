import { voices } from '@/lib/drizzle/schemas/voice'
import { relations } from 'drizzle-orm'
import {
  index,
  integer,
  pgTable,
  real,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const generations = pgTable(
  'generations',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => nanoid()),
    organizationId: text('organization_id').notNull(),
    voiceId: text('voice_id').references(() => voices.id, {
      onDelete: 'set null',
    }),
    prompt: text('prompt').notNull(),
    voiceName: text('voice_name').notNull(),
    r2ObjectKey: text('r2_object_key'),
    temperature: real('temperature').notNull(),
    topP: real('top_p').notNull(),
    topK: integer('top_k').notNull(),
    repetitionPenalty: real('repetition_penalty').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [
    index('generations_organization_id_idx').on(t.organizationId),
    index('generations_voice_id_idx').on(t.voiceId),
  ],
).enableRLS()

export const generationRelations = relations(generations, ({ one }) => ({
  voice: one(voices, {
    fields: [generations.voiceId],
    references: [voices.id],
  }),
}))
