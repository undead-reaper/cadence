import { generations } from '@/lib/drizzle/schemas/generations'
import { relations } from 'drizzle-orm'
import { index, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const voiceCategories = pgEnum('voice_categories', [
  'Audiobook',
  'Conversational',
  'Customer Service',
  'General',
  'Narrative',
  'Characters',
  'Meditation',
  'Motivational',
  'Podcast',
  'Advertising',
  'Voiceover',
  'Corporate',
])

export const voiceVariant = pgEnum('voice_variant', ['Custom', 'System'])

export const voices = pgTable(
  'voices',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => nanoid()),
    organizationId: text('organization_id'),
    name: text('name').notNull(),
    description: text('description'),
    category: voiceCategories('category').notNull().default('General'),
    language: text('language').notNull().default('en-US'),
    variant: voiceVariant('variant').notNull(),
    r2ObjectKey: text('r2_object_key'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [
    index('voices_organization_id_idx').on(t.organizationId),
    index('voices_variant_idx').on(t.variant),
  ],
).enableRLS()

export const voicesRelations = relations(voices, ({ many }) => ({
  generations: many(generations),
}))
