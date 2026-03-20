// app/(app)/responses/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ResponsesList } from './ResponsesList';

export default async function ResponsesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const { data: responses, error } = await supabase
    .from('responses')
    .select(`
      id,
      respondent_email,
      answers,
      submitted_at,
      surveys!inner (title)
    `)
    .eq('surveys.user_id', user.id)  // Only responses from surveys owned by this user
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch responses:', error.message);
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <div className="text-center text-destructive">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2">Failed to load responses. Please try again later.</p>
        </div>
      </div>
    );
  }

  return <ResponsesList initialResponses={responses || []} />;
}