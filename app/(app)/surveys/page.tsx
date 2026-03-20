// app/(app)/surveys/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SurveysList from './SurveyList';

export default async function SurveysPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: surveys, error } = await supabase
    .from('surveys')
    .select('id, title, survey_type, status, anonymous, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch surveys:', error.message);
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <div className="text-center text-destructive">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2">Failed to load your surveys. Please try again later.</p>
        </div>
      </div>
    );
  }

  return <SurveysList initialSurveys={surveys || []} />;
}