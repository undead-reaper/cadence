import QuickActionCard from '@/features/dashboard/components/QuickActionCard'

const quickActions: Array<QuickAction> = [
  {
    title: 'Explain a Complex Concept',
    description: 'Break down difficult topics into easy-to-understand audio',
    prompt:
      "Imagine a black hole not as a cosmic vacuum cleaner, but as a waterfall of space-time. Once you cross the edge, the current is simply too strong to swim against, even if you're traveling at the speed of light.",
  },
  {
    title: 'Welcome a Customer',
    description: 'Create a warm and professional greeting for your business',
    prompt:
      'Thank you for calling Horizon Dynamics. Your call is very important to us. All of our representatives are currently assisting other customers, but please stay on the line and we will be with you shortly.',
  },
  {
    title: 'Read a Biography',
    description:
      'Produce engaging non-fiction audio for audiobooks and articles',
    prompt:
      'Born into obscurity, she possessed an intellect that could not be hidden. By her twentieth birthday, she had already formulated theories that would soon challenge the greatest minds of her generation and change the course of modern physics.',
  },
  {
    title: 'Call a Sports Play',
    description: 'Inject high-energy excitement into game highlights',
    prompt:
      "Ten seconds left on the clock! He drives down the center, dodges one defender, steps back, and shoots from beyond the arc... It's up, and it's good! A buzzer-beater to win the championship! The crowd is absolutely going wild!",
  },
  {
    title: 'Deliver the News',
    description: 'Broadcast clear and authoritative daily updates',
    prompt:
      'Good evening. Top stories tonight: Global markets saw an unexpected rally today following the announcement of a breakthrough in renewable energy technology. Meanwhile, local residents are bracing for what could be the heaviest snowfall of the decade.',
  },
  {
    title: 'Give a Pep Talk',
    description: 'Inspire your audience with powerful motivational speeches',
    prompt:
      "You didn't come this far just to come this far. Every setback you've faced was just preparation for this exact moment. Look at how much you've grown. Now take a deep breath, step out there, and show them exactly what you're made of.",
  },
]

const QuickActionsPanel = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold font-lora">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => (
          <QuickActionCard action={action} key={action.title} />
        ))}
      </div>
    </div>
  )
}

export default QuickActionsPanel
