import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import GenerateButton from '@/features/text-to-speech/components/GenerateButton'
import { ttsFormOptions } from '@/features/text-to-speech/components/TextToSpeechForm'
import {
  COST_PER_CHARACTER,
  MAX_QUERY_LENGTH,
} from '@/features/text-to-speech/constants'
import { useTypedAppFormContext } from '@/hooks/use-app-form'
import { useStore } from '@tanstack/react-form'
import { Coins } from 'lucide-react'
import SettingsDrawer from '@/features/text-to-speech/components/SettingsDrawer'
import VoiceSelectorButton from '@/features/text-to-speech/components/VoiceSelectorButton'
import HistoryDrawer from '@/features/text-to-speech/components/HistoryDrawer'
import type { getAllGenerationsByOrganizationId } from '@/features/text-to-speech/functions/getAllGenerationsByOrganizationId'
import PromptSuggestions from '@/features/text-to-speech/components/PromptSuggestions'

type Generation = Awaited<
  ReturnType<typeof getAllGenerationsByOrganizationId>
>[number]

type Props = Readonly<{
  generations: Array<Generation>
}>

const QueryInputPanel = ({ generations }: Props) => {
  const form = useTypedAppFormContext(ttsFormOptions)
  const query = useStore(form.store, (state) => state.values.query)
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  return (
    <div className="flex h-full min-h-0 flex-col flex-1">
      <div className="relative min-h-0 flex-1">
        <form.Field
          name="query"
          children={(field) => {
            return (
              <Textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Start typing or paste your query here"
                className="absolute inset-0 resize-none border-0 bg-background! p-4 pb-6 lg:p-6 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0 rounded-none"
                maxLength={MAX_QUERY_LENGTH}
                disabled={isSubmitting}
              />
            )
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent" />
      </div>
      <div className="shrink-0 p-4 lg:p-6">
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex items-center gap-2">
            <SettingsDrawer>
              <VoiceSelectorButton />
            </SettingsDrawer>
            <HistoryDrawer generations={generations} />
          </div>
          <GenerateButton
            className="w-full"
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            onSubmit={() => form.handleSubmit()}
          />
        </div>
        {query.length > 0 ? (
          <div className="hidden items-center justify-between lg:flex">
            <Badge variant="outline" className="gap-1.5 border-dashed">
              <Coins className="size-3 text-yellow-500" />
              <span className="text-xs tabular-nums">
                ${(query.length * COST_PER_CHARACTER).toFixed(4)} estimated
              </span>
            </Badge>
            <div className="flex items-center gap-3">
              <p className="text-xs tracking-tight">
                {query.length.toLocaleString()}
                <span className="text-muted-foreground">
                  &nbsp;/&nbsp;{MAX_QUERY_LENGTH.toLocaleString()} characters
                </span>
              </p>
              <GenerateButton
                size="sm"
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                onSubmit={() => form.handleSubmit()}
              />
            </div>
          </div>
        ) : (
          <div className="hidden lg:block">
            <PromptSuggestions
              onSelect={(p) => form.setFieldValue('query', p)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default QueryInputPanel
