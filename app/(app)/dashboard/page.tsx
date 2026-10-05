import { ChartAreaInteractive, type TrendPoint } from '@/components/web/chart-area-interactive'
import { DataTable, type Response } from '@/components/web/data-table'
import { SectionCards, type DashboardStats } from '@/components/web/section-cards'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateSurveyButton } from '@/components/web/create-survey-button'

type ResponseRow = {
  id: string
  answers: unknown
  submitted_at: string | null
  respondent_email: string | null
  surveys: { title?: string; user_id?: string } | { title?: string; user_id?: string }[] | null
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}`
}

function collectScores(answers: unknown, into: number[]) {
  if (answers == null) return
  if (typeof answers === 'number' && answers >= 0 && answers <= 10) {
    into.push(answers)
    return
  }
  if (typeof answers === 'string' && /^\d+(\.\d+)?$/.test(answers)) {
    const n = Number(answers)
    if (n >= 0 && n <= 10) into.push(n)
    return
  }
  if (Array.isArray(answers)) {
    answers.forEach((item) => collectScores(item, into))
    return
  }
  if (typeof answers === 'object') {
    Object.values(answers as Record<string, unknown>).forEach((item) => collectScores(item, into))
  }
}

function sentimentFromScore(score: number | null): Response['sentiment'] {
  if (score == null) return 'Neutral'
  if (score >= 7) return 'Positive'
  if (score >= 5) return 'Neutral'
  return 'Negative'
}

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return redirect('/auth/login')

  const { data: surveys } = await supabase
    .from('surveys')
    .select('id, created_at, status')
    .eq('user_id', user.id)

  const { data: responses } = await supabase
    .from('responses')
    .select('id, answers, submitted_at, respondent_email, surveys!inner(title, user_id)')
    .eq('surveys.user_id', user.id)
    .order('submitted_at', { ascending: false })
    .limit(500)

  const surveyRows = surveys ?? []
  const responseRows = (responses ?? []) as ResponseRow[]
  const now = new Date()
  const thisMonth = monthKey(now)
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonth = monthKey(lastMonthDate)
  const weekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000
  const twoWeeksAgo = now.getTime() - 14 * 24 * 60 * 60 * 1000

  const surveysThisMonth = surveyRows.filter((row) => row.created_at && monthKey(new Date(row.created_at)) === thisMonth).length
  const surveysLastMonth = surveyRows.filter((row) => row.created_at && monthKey(new Date(row.created_at)) === lastMonth).length

  const thisWeek = responseRows.filter((row) => row.submitted_at && new Date(row.submitted_at).getTime() >= weekAgo).length
  const previousWeek = responseRows.filter((row) => {
    if (!row.submitted_at) return false
    const t = new Date(row.submitted_at).getTime()
    return t >= twoWeeksAgo && t < weekAgo
  }).length
  const weekChange = previousWeek === 0 ? thisWeek * 100 : Math.round(((thisWeek - previousWeek) / previousWeek) * 100)

  const scores: number[] = []
  responseRows.forEach((row) => collectScores(row.answers, scores))
  const average = scores.length ? scores.reduce((sum, n) => sum + n, 0) / scores.length : null

  const surveysWithReplies = new Set(
    responseRows.map((row) => {
      const survey = Array.isArray(row.surveys) ? row.surveys[0] : row.surveys
      return survey?.title ?? ''
    }).filter(Boolean)
  ).size
  const rateBase = surveyRows.length || 0
  const replyRate = rateBase === 0 ? 0 : Math.round((surveysWithReplies / rateBase) * 100)

  const stats: DashboardStats = {
    surveys: surveyRows.length,
    surveysDelta: surveysThisMonth - surveysLastMonth,
    responses: responseRows.length,
    responsesDelta: `${weekChange >= 0 ? '+' : ''}${weekChange}%`,
    responsesUp: weekChange >= 0,
    satisfaction: average == null ? '\u2014' : `${average.toFixed(1)}/10`,
    satisfactionNote: scores.length ? `From ${scores.length} rating answers` : 'No rating answers yet',
    replyRate: `${replyRate}%`,
    replyNote: rateBase ? `${surveysWithReplies} of ${rateBase} surveys have a reply` : 'No surveys yet',
  }

  const trend: TrendPoint[] = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (6 - index), 1)
    const key = monthKey(date)
    const count = responseRows.filter((row) => row.submitted_at && monthKey(new Date(row.submitted_at)) === key).length
    return {
      month: date.toLocaleString('en', { month: 'short' }),
      responses: count,
    }
  })

  const tableRows: Response[] = responseRows.slice(0, 20).map((row) => {
    const survey = Array.isArray(row.surveys) ? row.surveys[0] : row.surveys
    const rowScores: number[] = []
    collectScores(row.answers, rowScores)
    const score = rowScores.length ? rowScores[0] : null
    return {
      id: row.id,
      survey: survey?.title || 'Survey',
      respondent: row.respondent_email || 'Anonymous',
      date: row.submitted_at ? new Date(row.submitted_at).toLocaleDateString() : '\u2014',
      score: score == null ? '\u2014' : String(score),
      sentiment: sentimentFromScore(score),
      action: 'View',
    }
  })

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards stats={stats} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive data={trend} />
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {tableRows.length > 0 ? (
              <DataTable data={tableRows} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <h2 className="text-2xl font-semibold mb-4">No responses yet</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Create your first survey to start collecting real user feedback.
                </p>
                <CreateSurveyButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
