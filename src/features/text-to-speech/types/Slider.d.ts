type Slider = {
  id: 'temperature' | 'topP' | 'topK' | 'repetitionPenalty'
  label: string
  leftLabel: string
  rightLabel: string
  min: number
  max: number
  step: number
  defaultValue: number
}
