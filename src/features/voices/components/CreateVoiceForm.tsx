import { useForm } from '@tanstack/react-form'
import locales from 'locale-codes'
import type { ReactNode } from 'react'
import { createVoiceFormSchema } from '@/features/voices/types/createVoiceSchema'
import type { CreateVoiceFormData } from '@/features/voices/types/createVoiceSchema'
import { createVoice } from '@/features/voices/functions/createVoice'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mic, Upload } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { voiceCategories } from '@/lib/drizzle/schemas/voice'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import FileDropzone from '@/features/voices/components/FileDropzone'
import VoiceRecorder from '@/features/voices/components/VoiceRecorder'
import { LoadingSwap } from '@/components/ui/loading-swap'
import { useNavigate } from '@tanstack/react-router'

const LANGUAGE_OPTIONS = locales.all
  .filter((l) => l.tag && l.tag.includes('-') && l.name)
  .map((l) => ({
    value: l.tag,
    label: l.location ? `${l.name} (${l.location})` : l.name,
  }))

type Props = Readonly<{
  scrollable?: boolean
  footer?: (submit: ReactNode) => ReactNode
  onError?: (message: string) => void
  onSubmit?: () => void
}>

const VoiceCreateForm = ({ footer, onError, scrollable, onSubmit }: Props) => {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      name: '',
      file: null as File | null,
      category: 'General',
      language: 'en-US',
      description: '',
    } as CreateVoiceFormData,
    validators: {
      onSubmit: createVoiceFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createVoice({ data: value })
        toast.success('Voice created successfully!', {
          description:
            'Your new voice is being processed and will be ready soon.',
        })
        form.reset()
        navigate({ to: '.' })
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'An unknown error occurred.'
        if (onError) {
          onError(message)
        } else {
          toast.error('Failed to create voice', { description: message })
        }
      } finally {
        onSubmit?.()
      }
    },
  })

  const isPending = form.state.isSubmitting

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={cn('flex flex-col', scrollable ? 'min-h-0 flex-1' : 'gap-6')}
    >
      <div
        className={cn(
          scrollable
            ? 'no-scrollbar flex flex-col gap-6 overflow-y-auto px-4'
            : 'flex flex-col gap-6',
        )}
      >
        <form.Field
          name="file"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <Tabs defaultValue="upload">
                  <TabsList className="h-11! w-full">
                    <TabsTrigger disabled={isPending} value="upload">
                      <Upload className="size-3.5" />
                      <span>Upload</span>
                    </TabsTrigger>
                    <TabsTrigger disabled={isPending} value="record">
                      <Mic className="size-3.5" />
                      <span>Record</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload">
                    <FileDropzone
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInvalid}
                    />
                  </TabsContent>
                  <TabsContent value="record">
                    <VoiceRecorder
                      file={field.state.value}
                      onFileChange={field.handleChange}
                      isInvalid={isInvalid}
                    />
                  </TabsContent>
                </Tabs>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field aria-disabled={isPending} data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  disabled={isPending}
                  id={field.name}
                  name={field.name}
                  aria-invalid={isInvalid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Sarah"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="category"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field aria-disabled={isPending} data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                <Select
                  disabled={isPending}
                  value={field.state.value}
                  onValueChange={(value) => {
                    const parsed =
                      createVoiceFormSchema.shape.category.safeParse(value)
                    if (parsed.success) {
                      field.handleChange(parsed.data)
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {voiceCategories.enumValues.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="language"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field aria-disabled={isPending} data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Language</FieldLabel>
                <Combobox
                  disabled={isPending}
                  items={LANGUAGE_OPTIONS}
                  autoHighlight
                >
                  <ComboboxInput placeholder="French" />
                  <ComboboxContent
                    onWheel={(e) => e.stopPropagation()}
                    className="pointer-events-auto"
                    onSelect={() => field.handleChange(field.state.value)}
                    key={field.state.value}
                  >
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList
                      children={(item: (typeof LANGUAGE_OPTIONS)[0]) => (
                        <ComboboxItem key={item.value} value={item}>
                          {item.label}
                        </ComboboxItem>
                      )}
                    ></ComboboxList>
                  </ComboboxContent>
                </Combobox>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="description"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field aria-disabled={isPending} data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  disabled={isPending}
                  id={field.name}
                  name={field.name}
                  aria-invalid={isInvalid}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="A warm and friendly voice."
                  autoComplete="off"
                  className="min-w-20"
                  rows={3}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <Field>
          {footer ? (
            footer(
              <Button disabled={isPending} type="submit">
                <LoadingSwap isLoading={isPending}>Create</LoadingSwap>
              </Button>,
            )
          ) : (
            <Button disabled={isPending} type="submit">
              <LoadingSwap isLoading={isPending}>Create</LoadingSwap>
            </Button>
          )}
        </Field>
      </div>
    </form>
  )
}

export default VoiceCreateForm
