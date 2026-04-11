import { Badge } from '@/components/ui/badge'
import type { PromptSuggestion } from '@/features/text-to-speech/types/promptSuggestion'
import {
  BookOpen,
  DoorOpen,
  Newspaper,
  Podcast,
  Signature,
  Volleyball,
} from 'lucide-react'

const promptSuggestions: Array<PromptSuggestion> = [
  {
    label: 'Explain a Complex Concept',
    icon: BookOpen,
    prompt:
      "Imagine a black hole not as a cosmic vacuum cleaner, but as a waterfall of space-time. Once you cross the edge, the current is simply too strong to swim against, even if you're traveling at the speed of light.",
  },
  {
    label: 'Welcome a Customer',
    icon: DoorOpen,
    prompt:
      'Thank you for calling Horizon Dynamics. Your call is very important to us. All of our representatives are currently assisting other customers, but please stay on the line and we will be with you shortly.',
  },
  {
    label: 'Read a Biography',
    icon: Signature,
    prompt:
      'Born into obscurity, she possessed an intellect that could not be hidden. By her twentieth birthday, she had already formulated theories that would soon challenge the greatest minds of her generation and change the course of modern physics.',
  },
  {
    label: 'Call a Sports Play',
    icon: Volleyball,
    prompt:
      "Ten seconds left on the clock! He drives down the center, dodges one defender, steps back, and shoots from beyond the arc... It's up, and it's good! A buzzer-beater to win the championship! The crowd is absolutely going wild!",
  },
  {
    label: 'Deliver the News',
    icon: Newspaper,
    prompt:
      'Good evening. Top stories tonight: Global markets saw an unexpected rally today following the announcement of a breakthrough in renewable energy technology. Meanwhile, local residents are bracing for what could be the heaviest snowfall of the decade.',
  },
  {
    label: 'Give a Pep Talk',
    icon: Podcast,
    prompt:
      "You didn't come this far just to come this far. Every setback you've faced was just preparation for this exact moment. Look at how much you've grown. Now take a deep breath, step out there, and show them exactly what you're made of.",
  },
]

type Props = Readonly<{
  onSelect: (prompt: string) => void
}>

const PromptSuggestions = ({ onSelect }: Props) => {
  return (
    <div className="space-y-2.5">
      <p className="text-sm text-muted-foreground">Get started with</p>
      <div className="flex flex-wrap gap-2">
        {promptSuggestions.map((suggestion) => (
          <Badge
            key={suggestion.label}
            variant="outline"
            className="cursor-pointer gap-1.5 py-1 px-2.5 text-xs hover:bg-accent rounded-md"
            onClick={() => onSelect(suggestion.prompt)}
          >
            <suggestion.icon className="size-3.5 shrink-0" size={14} />
            <span>{suggestion.label}</span>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default PromptSuggestions
