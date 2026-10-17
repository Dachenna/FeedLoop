'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, TrendingUp, ListChecks, Lightbulb, Target } from 'lucide-react';
import { generateSurveyInsights } from '@/app/action/ai';
import { notify } from '@/lib/notify';

type Survey = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

interface AnalyticsClientProps {
  surveys: Survey[];
}

function parseInsights(raw: string) {
  const sections = {
    sentiment: '',
    themes: '',
    insights: '',
    actions: '',
  };

  const lines = raw.split('\n');
  let current: keyof typeof sections | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^1\./i.test(trimmed) || /overall sentiment/i.test(trimmed)) {
      current = 'sentiment';
      sections.sentiment += trimmed.replace(/^1\.?\s*/i, '') + '\n';
    } else if (/^2\./i.test(trimmed) || /top 3 themes/i.test(trimmed)) {
      current = 'themes';
      sections.themes += trimmed.replace(/^2\.?\s*/i, '') + '\n';
    } else if (/^3\./i.test(trimmed) || /key insights/i.test(trimmed)) {
      current = 'insights';
      sections.insights += trimmed.replace(/^3\.?\s*/i, '') + '\n';
    } else if (/^4\./i.test(trimmed) || /suggested actions/i.test(trimmed)) {
      current = 'actions';
      sections.actions += trimmed.replace(/^4\.?\s*/i, '') + '\n';
    } else if (current) {
      sections[current] += line + '\n';
    }
  }

  // Fallback if parsing fails
  if (!sections.sentiment && !sections.themes) {
    return { raw };
  }

  return sections;
}

export default function AnalyticsClient({ surveys }: AnalyticsClientProps) {
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [usedModel, setUsedModel] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (surveyId: string) => {
    setSelectedSurveyId(surveyId);
    setInsights(null);
    setUsedModel(null);
    setLoading(true);

    try {
      const result = await generateSurveyInsights(surveyId);

      if ('error' in result && result.error) {
        notify.error(result.error);
        return;
      }

      if ('success' in result && result.success) {
        setInsights(result.analysis);
        setUsedModel(result.model);
        notify.success('AI insights ready');
      }
    } catch (err) {
      console.error('[AI] client', err);
      notify.error('Something went wrong generating insights.');
    } finally {
      setLoading(false);
    }
  };

  const parsed = insights ? parseInsights(insights) : null;

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Generate AI-powered insights from your survey responses.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {surveys.length === 0 ? (
          <p className="text-muted-foreground">No surveys found. Create one first.</p>
        ) : (
          surveys.map((survey) => (
            <Card key={survey.id}>
              <CardHeader>
                <CardTitle className="text-lg">{survey.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge variant="outline">{survey.status}</Badge>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(survey.created_at).toLocaleDateString()}
                </p>
                <Button
                  onClick={() => handleGenerate(survey.id)}
                  disabled={loading}
                  className="w-full"
                >
                  {loading && selectedSurveyId === survey.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Insights
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {insights && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <h2 className="text-2xl font-semibold">AI Insights</h2>
            {usedModel && (
              <Badge variant="secondary" className="text-xs font-mono ml-auto">
                {usedModel.split('/').pop()}
              </Badge>
            )}
          </div>

          {parsed && 'raw' in parsed ? (
            <Card>
              <CardContent className="pt-6">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {insights}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {parsed?.sentiment && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      Overall Sentiment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {parsed.sentiment.trim()}
                    </p>
                  </CardContent>
                </Card>
              )}

              {parsed?.themes && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ListChecks className="h-4 w-4 text-emerald-500" />
                      Top Themes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {parsed.themes.trim()}
                    </p>
                  </CardContent>
                </Card>
              )}

              {parsed?.insights && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Key Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {parsed.insights.trim()}
                    </p>
                  </CardContent>
                </Card>
              )}

              {parsed?.actions && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Target className="h-4 w-4 text-rose-500" />
                      Suggested Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {parsed.actions.trim()}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
