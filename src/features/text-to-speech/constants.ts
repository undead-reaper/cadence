export const COST_PER_CHARACTER = 0.0003
export const MAX_QUERY_LENGTH = 5000

export const SETTINGS_SLIDERS: Array<Slider> = [
  {
    id: 'temperature',
    label: 'Creativity',
    leftLabel: 'Consistent',
    rightLabel: 'Creative',
    min: 0,
    max: 2,
    step: 0.1,
    defaultValue: 0.8,
  },
  {
    id: 'topP',
    label: 'Voice Variation',
    leftLabel: 'Stable',
    rightLabel: 'Dynamic',
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 0.95,
  },
  {
    id: 'topK',
    label: 'Expressiveness',
    leftLabel: 'Subtle',
    rightLabel: 'Dramatic',
    min: 1,
    max: 10000,
    step: 100,
    defaultValue: 1000,
  },
  {
    id: 'repetitionPenalty',
    label: 'Natural Flow',
    leftLabel: 'Rhythmic',
    rightLabel: 'Varied',
    min: 1,
    max: 2,
    step: 0.1,
    defaultValue: 1.2,
  },
]
