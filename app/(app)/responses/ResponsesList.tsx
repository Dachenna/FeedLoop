// app/(app)/responses/ResponsesList.tsx
'use client'

import { useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle , CardFooter} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'

type Response = {
  id: string
  respondent_email: string | null
  answers: Record<string, string | number | boolean | null>
  submitted_at: string
  surveys: {
    title: string
  }
}

interface ResponsesListProps {
  initialResponses: Response[]
}

export function ResponsesList({ initialResponses }: ResponsesListProps) {
  const [responses, setResponses] = useState<Response[]>(initialResponses)
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (!confirm('Delete this response?')) return

    setDeletingId(id)

    startTransition(async () => {
      const supabase = createClient()
      const { error } = await supabase.from('responses').delete().eq('id', id)

      if (error) {
        toast.error('Failed to delete response')
      } else {
        setResponses((prev) => prev.filter((r) => r.id !== id))
        toast.success('Response deleted')
      }

      setDeletingId(null)
    })
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">All Responses</h1>

      {responses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {responses.map((response) => (
            <Card key={response.id}>
              <CardHeader>
                <CardTitle>{response.surveys.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Respondent: {response.respondent_email || 'Anonymous'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Submitted: {new Date(response.submitted_at).toLocaleString()}
                </p>
                <Badge variant="secondary">
                  Answers: {Object.keys(response.answers).length}
                </Badge>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(response.id)}
                  disabled={isPending && deletingId === response.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <BarChart3 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No responses yet</h2>
            <p className="text-muted-foreground mt-2 text-center max-w-sm">
              Create and share a survey to start collecting feedback.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}