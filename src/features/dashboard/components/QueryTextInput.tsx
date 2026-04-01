import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  COST_PER_CHARACTER,
  MAX_QUERY_LENGTH,
} from '@/features/text-to-speech/constants'
import { useNavigate } from '@tanstack/react-router'
import { Coins } from 'lucide-react'
import { useState } from 'react'

const QueryTextInput = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    const trimmed = query.trim()
    if (trimmed) {
      navigate({
        to: '/text-to-speech',
        search: {
          query: trimmed,
        },
      })
    }
  }

  return (
    <div className="rounded-[22px] bg-linear-185 from-[#FF8EE3] from-15% via-[#57D7E0] via-39% to-[#DBF1F2] to-85% p-0.5 shadow-[0_0_0_4px_transparent]">
      <div className="rounded-[20px] bg-muted p-1">
        <div className="space-y-4 rounded-2xl bg-background p-2 drop-shadow-xs">
          <Textarea
            placeholder="Start typing or paste your query here"
            className="min-h-35 resize-none border-0 bg-transparent! p-2 shadow-none focus-visible:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={MAX_QUERY_LENGTH}
          />
          <div className="flex items-center justify-between p-2">
            <Badge variant="outline" className="gap-1.5 border-dashed">
              <Coins className="size-3 text-yellow-500" />
              <span className="text-xs">
                {query.length === 0 ? (
                  'Start typing to estimate'
                ) : (
                  <>
                    <span className="tabular-nums">
                      ${(query.length * COST_PER_CHARACTER).toFixed(4)}
                      &nbsp;estimated
                    </span>
                  </>
                )}
              </span>
            </Badge>
            <span className="text-xs text-muted-foreground">
              {query.length.toLocaleString()}&nbsp;/&nbsp;
              {MAX_QUERY_LENGTH.toLocaleString()} characters
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end p-3">
          <Button
            type="submit"
            size="sm"
            disabled={!query.trim()}
            onClick={handleSubmit}
            className="w-full lg:w-auto"
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QueryTextInput
