// app/(app)/surveys/SurveysList.tsx
'use client';

import { useState, useTransition, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useSurvey } from '@/lib/contexts/survey-context';

type Survey = {
  id: string;
  title: string;
  survey_type: string;
  status: string;
  anonymous: boolean;
  created_at: string;
};

interface SurveysListProps {
  initialSurveys: Survey[];
}

export default function SurveysList({ initialSurveys }: SurveysListProps) {
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const { setOpen, createdSurveyId, setSurveyToEdit } = useSurvey();

  // Listen for newly created surveys
  useEffect(() => {
    if (!createdSurveyId) return;

    const fetchNewSurvey = async () => {
      const supabase = createClient();
      const { data: newSurvey } = await supabase
        .from('surveys')
        .select('id, title, survey_type, status, anonymous, created_at')
        .eq('id', createdSurveyId)
        .single();

      if (newSurvey) {
        setSurveys((prev) => [newSurvey, ...prev]);
      }
    };

    fetchNewSurvey();
  }, [createdSurveyId]);

  const handleDelete = (id: string) => {
    if (!confirm('Delete this survey permanently? This action cannot be undone.')) return;

    setDeletingId(id);

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.from('surveys').delete().eq('id', id);

      if (error) {
        toast.error(error.message || 'Failed to delete survey');
        console.error(error);
      } else {
        setSurveys((prev) => prev.filter((s) => s.id !== id));
        toast.success('Survey deleted successfully');
      }

      setDeletingId(null);
    });
  };

  const handleActivate = (id: string) => {
    setActivatingId(id);

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase
        .from('surveys')
        .update({ status: 'active' })
        .eq('id', id);

      if (error) {
        toast.error(error.message || 'Failed to activate survey');
        console.error(error);
      } else {
        setSurveys((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: 'active' } : s))
        );
        toast.success('Survey activated successfully');
      }

      setActivatingId(null);
    });
  };

  const handleEdit = (survey: Survey) => {
    setSurveyToEdit(survey);
    setOpen(true);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Surveys</h1>
        <Button size="lg" onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Survey
        </Button>
      </div>

      {/* Surveys Grid */}
      {surveys.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {surveys.map((survey) => (
            <Card
              key={survey.id}
              className="flex h-full flex-col transition-all hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="line-clamp-2 text-lg leading-tight">
                    {survey.title || 'Untitled Survey'}
                  </CardTitle>
                  <Badge
                    variant={survey.status === 'active' ? 'default' : 'secondary'}
                    className="mt-0.5 shrink-0"
                  >
                    {survey.status?.toUpperCase() || 'DRAFT'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-between space-y-4 pt-0">
                {/* Metadata */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    <span>Type: <strong className="text-foreground">{survey.survey_type?.toUpperCase() || 'NPS'}</strong></span>
                    <span className="hidden sm:inline">•</span>
                    <span>{survey.anonymous ? 'Anonymous responses' : 'Email required'}</span>
                  </div>
                  <div>
                    Created on {new Date(survey.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/survey/${survey.id}`}>
                      <Eye className="mr-1.5 h-4 w-4" />
                      Preview
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(survey)}>
                    <Edit className="mr-1.5 h-4 w-4" />
                    Edit
                  </Button>
                  {survey.status === 'draft' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleActivate(survey.id)}
                      disabled={isPending && activatingId === survey.id}
                    >
                      {isPending && activatingId === survey.id ? 'Activating...' : 'Activate'}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDelete(survey.id)}
                    disabled={isPending && deletingId === survey.id}
                  >
                    <Trash2 className="mr-1.5 h-4 w-4" />
                    {isPending && deletingId === survey.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-xl border bg-muted/40 px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">No surveys yet</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Start collecting real user feedback — create your first survey in seconds.
          </p>
          <Button size="lg" className="mt-6 dark:text-grey-300" onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Your First Survey
          </Button>
        </div>
      )}
    </div>
  );
}