import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

type ParseLocaleOptions = {
  locale: string
}

export const parseLocale = ({ locale }: ParseLocaleOptions) => {
  const [_, country] = locale.split('-')
  if (!country) return { flag: '', region: locale }
  const flag = [...country.toUpperCase()]
    .map((char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
    .join('')
  const region = regionNames.of(country) ?? country
  return { flag, region }
}

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  else return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
