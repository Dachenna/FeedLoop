import { SubmitResponseSchema } from "@/app/schemas/auth";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitResponseAction(formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    survey_id: formData.get('survey_id') as string,
    respondent_email: formData.get('respondent_email') as string | null,
    answers: JSON.parse(formData.get('answers') as string || '{}'),
  };

  const validation = SubmitResponseSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: 'Invalid submission', issues: validation.error.issues };
  }

  const { data: survey } = await supabase
    .from('surveys')
    .select('status, anonymous')
    .eq('id', rawData.survey_id)
    .single();

  if (!survey || survey.status !== 'active') {
    return { error: 'Survey not available' };
  }

  const insertData: {
    survey_id: string;
    answers: Record<string, unknown>;
    respondent_email?: string | null;
  } = {
    survey_id: rawData.survey_id,
    answers: rawData.answers,
  };

  if (!survey.anonymous && rawData.respondent_email) {
    insertData.respondent_email = rawData.respondent_email;
  }

  const { error } = await supabase
    .from('responses')
    .insert(insertData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/survey/${rawData.survey_id}`);
  return { success: true };
}