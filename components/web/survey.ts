'use server';

import { createClient } from '@/lib/supabase/server'; 
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SurveySchema } from '@/app/schemas/auth'; // Your schema with title, survey_type, etc.

export async function createSurveyAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('No authenticated user');
    redirect('/auth/login')
    return { error: 'Not authenticated - please log in' ,};
  }

  const rawData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string | null,
    survey_type: formData.get('survey_type') as string,
    anonymous: formData.get('anonymous') === 'true',
    status: formData.get('status') as string,
    questions: (() => {
      const questionsJson = formData.get('questions') as string;
      try {
        return questionsJson ? JSON.parse(questionsJson) : [];
      } catch (e) {
        console.error('Failed to parse questions JSON:', e);
        return [];
      }
    })(),
  };


  const validation = SurveySchema.safeParse(rawData);
  if (!validation.success) {
    console.error('Validation failed:', validation.error.issues);
    return {
      error: 'Validation failed',
      issues: validation.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    };
  }

  const validatedData = validation.data;

  // Insert into 'surveys' with questions as JSONB
  const { data: survey, error: surveyError } = await supabase
    .from('surveys')
    .insert({
      user_id: user.id,
      title: validatedData.title,
      description: validatedData.description,
      survey_type: validatedData.survey_type,
      anonymous: validatedData.anonymous,
      status: validatedData.status,
      questions: validatedData.questions, // as JSONB array
    })
    .select('id')
    .single();

  if (surveyError || !survey) {
    console.error('Survey insert error:', surveyError?.message, surveyError?.details, surveyError?.hint); // More logging
    return { error: surveyError?.message || 'Failed to create survey' };
  }
  // Trigger cache revalidation so pages show the new survey
  revalidatePath('/dashboard');
  revalidatePath('/surveys');

  return { success: true, surveyId: survey.id };
}

export async function updateSurveyAction(formData: FormData, surveyId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('No authenticated user');
    redirect('/auth/login')
    return { error: 'Not authenticated - please log in' };
  }

  const rawData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string | null,
    survey_type: formData.get('survey_type') as string,
    anonymous: formData.get('anonymous') === 'true',
    questions: (() => {
      const questionsJson = formData.get('questions') as string;
      try {
        return questionsJson ? JSON.parse(questionsJson) : [];
      } catch (e) {
        console.error('Failed to parse questions JSON:', e);
        return [];
      }
    })(),
  };

  const validation = SurveySchema.safeParse(rawData);
  if (!validation.success) {
    console.error('Validation failed:', validation.error.issues);
    return {
      error: 'Validation failed',
      issues: validation.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    };
  }

  const validatedData = validation.data;

  // Update the survey
  const { error: surveyError } = await supabase
    .from('surveys')
    .update({
      title: validatedData.title,
      description: validatedData.description,
      survey_type: validatedData.survey_type,
      anonymous: validatedData.anonymous,
      questions: validatedData.questions,
    })
    .eq('id', surveyId)
    .eq('user_id', user.id);

  if (surveyError) {
    console.error('Survey update error:', surveyError?.message);
    return { error: surveyError?.message || 'Failed to update survey' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/surveys');

  return { success: true, surveyId };
}

export async function updateSurveyStatusAction(surveyId: string, newStatus: 'draft' | 'active' | 'closed') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('No authenticated user');
    return { error: 'Not authenticated - please log in' };
  }

  // Optional: validate newStatus
  if (!['draft', 'active', 'closed'].includes(newStatus)) {
    return { error: 'Invalid status value' };
  }

  const { error } = await supabase
    .from('surveys')
    .update({ status: newStatus })
    .eq('id', surveyId)
    .eq('user_id', user.id); // Security: only owner can change

  if (error) {
    console.error('Status update error:', error.message);
    return { error: error.message || 'Failed to update status' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/surveys');
  return { success: true, surveyId };
}