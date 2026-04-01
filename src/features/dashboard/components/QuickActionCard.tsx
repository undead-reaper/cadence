import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

type Props = Readonly<{
  action: QuickAction
}>

const QuickActionCard = ({ action }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{action.title}</CardTitle>
        <CardDescription>{action.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="secondary" size="xs" className="w-fit" asChild>
          <Link
            to="/text-to-speech"
            search={{
              query: action.prompt,
            }}
          >
            <span>Try Now</span>
            <ArrowRight className="size-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default QuickActionCard
