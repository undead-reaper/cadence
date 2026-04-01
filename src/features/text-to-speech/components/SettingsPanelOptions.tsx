import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Slider } from '@/components/ui/slider'
import { ttsFormOptions } from '@/features/text-to-speech/components/TextToSpeechForm'
import { SETTINGS_SLIDERS } from '@/features/text-to-speech/constants'
import { useTypedAppFormContext } from '@/hooks/use-app-form'
import { Fragment } from 'react'

const SettingsPanelOptions = () => {
  const form = useTypedAppFormContext(ttsFormOptions)

  return (
    <Fragment>
      <div className="border-b border-dashed p-4">
        <p className="text-sm text-muted-foreground">
          Voice selection coming soon.
        </p>
      </div>
      <div className="p-4 flex-1">
        <FieldGroup className="gap-8">
          {SETTINGS_SLIDERS.map((setting) => (
            <form.Field
              name={setting.id}
              key={setting.id}
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel>{setting.label}</FieldLabel>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {setting.leftLabel}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {setting.rightLabel}
                      </span>
                    </div>
                    <Slider
                      value={[field.state.value]}
                      onValueChange={(e) => field.handleChange(e[0])}
                      min={setting.min}
                      max={setting.max}
                      step={setting.step}
                      disabled={form.state.isSubmitting}
                      className="**:data-[slot=slider-thumb]:size-3 **:data-[slot=slider-thumb]:bg-primary **:data-[slot=slider-track]:h-1"
                    />
                  </Field>
                )
              }}
            />
          ))}
        </FieldGroup>
      </div>
    </Fragment>
  )
}

export default SettingsPanelOptions
