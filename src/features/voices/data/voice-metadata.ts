import type { voiceCategories } from '@/lib/drizzle/schemas/voice'
import { CANONICAL_SYSTEM_VOICE_NAMES } from './voice-scoping'

type VoiceCategory = (typeof voiceCategories.enumValues)[number]

type VoiceMetadata = {
  description: string
  category: VoiceCategory
  language: string
}

const VoiceNames = CANONICAL_SYSTEM_VOICE_NAMES
export type VoiceName = (typeof VoiceNames)[number]
export const SystemVoiceMetadata: Record<VoiceName, VoiceMetadata> = {
  Aaron: {
    description: 'Soothing and calm, like a self-help audiobook narrator',
    category: 'Audiobook',
    language: 'en-US',
  },
  Abigail: {
    description: 'Friendly and conversational with a warm, approachable tone',
    category: 'Conversational',
    language: 'en-GB',
  },
  Anaya: {
    description: 'Polite and professional, suited for customer service',
    category: 'Customer Service',
    language: 'en-IN',
  },
  Andy: {
    description: 'Versatile and clear, a reliable all-purpose narrator',
    category: 'General',
    language: 'en-US',
  },
  Archer: {
    description: 'Laid-back and reflective with a steady, storytelling pace',
    category: 'Narrative',
    language: 'en-US',
  },
  Brian: {
    description: 'Professional and helpful with a clear customer support tone',
    category: 'Customer Service',
    language: 'en-US',
  },
  Chloe: {
    description: 'Bright and bubbly with a cheerful, outgoing personality',
    category: 'Corporate',
    language: 'en-AU',
  },
  Dylan: {
    description:
      'Thoughtful and intimate, like a quiet late-night conversation',
    category: 'General',
    language: 'en-US',
  },
  Emmanuel: {
    description: 'Nasally and distinctive with a quirky, cartoon-like quality',
    category: 'Characters',
    language: 'en-US',
  },
  Ethan: {
    description: 'Polished and warm with crisp, studio-quality delivery',
    category: 'Voiceover',
    language: 'en-US',
  },
  Evelyn: {
    description: 'Warm Southern charm with a heartfelt, down-to-earth feel',
    category: 'Conversational',
    language: 'en-US',
  },
  Gavin: {
    description: 'Calm and reassuring with a smooth, natural flow',
    category: 'Meditation',
    language: 'en-US',
  },
  Gordon: {
    description: 'Warm and encouraging with an uplifting, motivational tone',
    category: 'Motivational',
    language: 'en-US',
  },
  Ivan: {
    description: 'Deep and cinematic with a dramatic, movie-character presence',
    category: 'Characters',
    language: 'ru-RU',
  },
  Laura: {
    description: 'Authentic and warm with a conversational Midwestern tone',
    category: 'Conversational',
    language: 'en-US',
  },
  Lucy: {
    description: 'Direct and composed with a professional phone manner',
    category: 'Customer Service',
    language: 'en-US',
  },
  Madison: {
    description: 'Energetic and unfiltered with a casual, chatty vibe',
    category: 'Podcast',
    language: 'en-US',
  },
  Marisol: {
    description: 'Confident and polished with a persuasive, ad-ready delivery',
    category: 'Advertising',
    language: 'en-US',
  },
  Meera: {
    description: 'Friendly and helpful with a clear, service-oriented tone',
    category: 'Customer Service',
    language: 'en-IN',
  },
  Walter: {
    description: 'Old and raspy with deep gravitas, like a wise grandfather',
    category: 'Narrative',
    language: 'en-US',
  },
}
