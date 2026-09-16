'use server';

import Groq from 'groq-sdk';
import { createClient } from '@/lib/supabase/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateSurveyInsights(surveyId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  // Get responses that belong to the current user
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

  type ResponseRow = { answers: unknown; surveys?: { title?: string; user_id?: string } };
  const surveyTitle = (responses[0] as ResponseRow)?.surveys?.title ?? 'Survey';

  const formattedResponses = responses
    .map((r, i) => `Response ${i + 1}: ${JSON.stringify(r.answers)}`)
    .join('\n');

  const prompt = `
You are a product analyst. Analyze these survey responses for "${surveyTitle}".

Return a clear and useful summary with these sections:

1. Overall Sentiment (Positive / Neutral / Negative) + short reason
2. Top 3 Themes
3. Key Insights (bullet points)
4. Suggested Actions

Keep it concise and actionable.

Responses:
${formattedResponses}
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile', // Good free model on Groq
      temperature: 0.3,
    });

    return {
      success: true,
      analysis: completion.choices[0]?.message?.content || 'No analysis generated',
    };
  } catch (err) {
    console.error('Groq Error:', err);
    return { error: 'Failed to generate AI insights. Please try again.' };
 }
}