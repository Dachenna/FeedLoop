// app/survey/[id]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import SurveyForm from './SurveyForm';

export default async function PublicSurveyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: survey, error } = await supabase
    .from('surveys')
    .select('id, title, description, survey_type, anonymous, status, questions')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !survey || survey.status !== 'active') {
    notFound(); // 404 if survey not found or inactive
  }

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{survey.title}</h1>
      {survey.description && (
        <p className="text-muted-foreground mb-8">{survey.description}</p>
      )}
      <SurveyForm survey={survey} />
    </div>
  );
}