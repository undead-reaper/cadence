import type { getAllVoices } from '@/features/voices/functions/getAllVoices'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

type TTSVoiceItem = Awaited<ReturnType<typeof getAllVoices>>['system'][number]

type TTSVoicesContextValue = Readonly<{
  customVoices: TTSVoiceItem[]
  systemVoices: TTSVoiceItem[]
  allVoices: TTSVoiceItem[]
}>

const TTSVoicesContext = createContext<TTSVoicesContextValue | null>(null)

type TTSVoiceProviderProps = Readonly<{
  children: ReactNode
  value: TTSVoicesContextValue
}>
export const TTSVoicesProvider = ({
  children,
  value,
}: TTSVoiceProviderProps) => {
  return (
    <TTSVoicesContext.Provider value={value}>
      {children}
    </TTSVoicesContext.Provider>
  )
}

export const useTTSVoices = () => {
  const context = useContext(TTSVoicesContext)
  if (!context) {
    throw new Error('useTTSVoices must be used within a TTSVoicesProvider')
  } else {
    return context
  }
}
