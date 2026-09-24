'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateSurveyInsights } from '@/app/action/ai';
import { notify } from '@/lib/notify';

// Notify: displays user-facing messages for actions (success/error/info).
// Avoid invoking notify at module load to prevent toast popping on import.

type Survey = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

interface AnalyticsClientProps {
  surveys: Survey[];
}

export default function AnalyticsClient({ surveys }: AnalyticsClientProps) {
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (surveyId: string) => {
    setSelectedSurveyId(surveyId);
    setLoading(true);
    setInsights(null);

    const result = await generateSurveyInsights(surveyId);

    if (result.error) {
      notify.error(result.error);
    } else {
      setInsights(result.analysis || null);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Generate AI-powered insights from your survey responses.
        </p>
      </div>

      {/* Survey List */}
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
                  disabled={loading && selectedSurveyId === survey.id}
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

      {/* AI Insights Result */}
      {insights && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm leading-relaxed prose dark:prose-invert max-w-none">
              {insights}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}