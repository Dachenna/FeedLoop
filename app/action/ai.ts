'use server';

import { createClient } from '@/lib/supabase/server';

const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_MODELS = [
  'nvidia/nemotron-3.5-lightning-30b-a3b',
  'nvidia/llama-3.1-nemotron-70b-instruct',
] as const;

const MAX_RESPONSES = 40;
const MAX_ANSWER_CHARS = 800;
const FETCH_TIMEOUT_MS = 45_000;

type InsightResult =
  | { success: true; analysis: string; model: string }
  | { error: string };

function extractMessageText(message: {
  content?: unknown;
  reasoning?: unknown;
} | undefined): string {
  if (!message) return '';

  const raw = message.content;
  if (typeof raw === 'string' && raw.trim()) return raw.trim();

  if (Array.isArray(raw)) {
    const joined = raw
      .map((part) => {
        if (typeof part === 'string') return part;
        if (part && typeof part === 'object' && 'text' in part) {
          return String((part as { text?: string }).text ?? '');
        }
        return '';
      })
      .join('\n')
      .trim();
    if (joined) return joined;
  }

  if (typeof message.reasoning === 'string' && message.reasoning.trim()) {
    return message.reasoning.trim();
  }

  return '';
}

function clipAnswers(answers: unknown): string {
  try {
    const text = JSON.stringify(answers);
    if (text.length <= MAX_ANSWER_CHARS) return text;
    return `${text.slice(0, MAX_ANSWER_CHARS)}…`;
  } catch {
    return String(answers);
  }
}

async function callNvidia(model: string, prompt: string): Promise<{
  ok: boolean;
  text?: string;
  status?: number;
  detail?: string;
}> {
  const apiKey = process.env.NVIDIA_NIM_API_KEY;
  if (!apiKey) {
    return { ok: false, detail: 'NVIDIA_NIM_API_KEY is missing from .env.local' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(NVIDIA_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are a concise product analyst. Use short headings and bullets. No markdown tables.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 800,
        stream: false,
      }),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const detail =
        data?.error?.message ||
        data?.message ||
        `NVIDIA HTTP ${res.status}`;
      console.error('[AI] NVIDIA error', model, res.status, data);
      return { ok: false, status: res.status, detail };
    }

    const text = extractMessageText(data?.choices?.[0]?.message);
    if (!text) {
      console.error('[AI] empty NVIDIA payload', model, data);
      return { ok: false, detail: 'NVIDIA returned an empty analysis' };
    }

    return { ok: true, text };
  } catch (err) {
    const aborted = err instanceof Error && err.name === 'AbortError';
    const detail = aborted
      ? 'NVIDIA request timed out after 45s'
      : err instanceof Error
        ? err.message
        : 'Unknown NVIDIA fetch error';
    console.error('[AI] fetch failed', model, detail);
    return { ok: false, detail };
  } finally {
    clearTimeout(timer);
  }
}

export async function generateSurveyInsights(surveyId: string): Promise<InsightResult> {
  console.log('[AI] start', surveyId);

  if (!surveyId) return { error: 'Missing survey id' };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized. Sign in again.' };

  const { data: responses, error } = await supabase
    .from('responses')
    .select(
      `
      answers,
      surveys!inner (title, user_id)
    `
    )
    .eq('survey_id', surveyId)
    .eq('surveys.user_id', user.id)
    .limit(MAX_RESPONSES);

  if (error) {
    console.error('[AI] supabase', error.message);
    return { error: `Could not load responses: ${error.message}` };
  }

  if (!responses || responses.length === 0) {
    return { error: 'No responses yet for this survey. Collect answers first.' };
  }

  type ResponseRow = {
    answers: unknown;
    surveys?: { title?: string } | { title?: string }[];
  };

  const first = responses[0] as ResponseRow;
  const surveyRel = Array.isArray(first.surveys) ? first.surveys[0] : first.surveys;
  const surveyTitle = surveyRel?.title ?? 'Survey';

  const formattedResponses = responses
    .map((row, i) => `Response ${i + 1}: ${clipAnswers((row as ResponseRow).answers)}`)
    .join('\n');

  const prompt = `Analyze these survey responses for "${surveyTitle}".

Return exactly these sections:
1. Overall Sentiment (Positive / Neutral / Mixed / Negative) + one-line reason
2. Top 3 Themes
3. Key Insights
4. Suggested Actions (3 concrete next steps)

Responses (${responses.length}):
${formattedResponses}`;

  let lastDetail = 'Failed to generate AI insights.';

  for (const model of NVIDIA_MODELS) {
    console.log('[AI] trying model', model);
    const result = await callNvidia(model, prompt);
    if (result.ok && result.text) {
      console.log('[AI] success', model);
      return { success: true, analysis: result.text, model };
    }
    lastDetail = result.detail || lastDetail;
  }

  return { error: lastDetail };
}
