'use server';

import { createClient } from '@/lib/supabase/server';

const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_MODEL = 'nvidia/nemotron-3.5-lightning-30b-a3b';

export async function generateSurveyInsights(surveyId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const { data: responses, error } = await supabase
    .from('responses')
    .select(`
      answers,
      surveys!inner (title, user_id)
    `)
    .eq('survey_id', surveyId)
    .eq('surveys.user_id', user.id);

  if (error || !responses || responses.length === 0) {
    return { error: 'No responses found for this survey' };
  }

  type ResponseRow = { answers: unknown; surveys?: { title?: string } };
  const surveyTitle = (responses[0] as ResponseRow)?.surveys?.title ?? 'Survey';

  const formattedResponses = responses
    .map((r, i) => `Response ${i + 1}: ${JSON.stringify(r.answers)}`)
    .join('\n');

  const prompt = `You are a product analyst. Analyze these survey responses for "${surveyTitle}".

Return:
1. Overall Sentiment (Positive / Neutral / Negative) + short reason
2. Top 3 Themes
3. Key Insights (bullet points)
4. Suggested Actions

Keep it concise and actionable.

Responses:
${formattedResponses}`;

  try {
    const res = await fetch(NVIDIA_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NVIDIA_NIM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: NVIDIA_MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('NVIDIA NIM error:', data);
      return { error: 'Failed to generate AI insights. Please try again.' };
    }

    return {
      success: true,
      analysis: data.choices?.[0]?.message?.content || 'No analysis generated',
    };
  } catch (err) {
    console.error('NVIDIA NIM error:', err);
    return { error: 'Failed to generate AI insights. Please try again.' };
  }
}