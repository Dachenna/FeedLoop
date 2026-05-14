// app/survey/[id]/SurveyForm.tsx
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { submitResponseAction } from '@/components/web/response';
import { Heart, MessageSquare, Star } from 'lucide-react';
import { BackgroundCircles } from '@/components/ui/BGcircles/background-circles';

type SurveyQuestion = {
  type: 'text' | 'multiple_choice' | 'rating';
  text: string;
  required?: boolean;
  options?: string[];
  settings?: { min: number; max: number };
};

type SurveyData = {
  id: string;
  title?: string;
  description?: string;
  anonymous?: boolean;
  questions?: SurveyQuestion[];
};

export default function SurveyForm({ survey }: { survey: SurveyData }) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const totalQuestions = survey.questions?.length || 0;
  const answeredQuestions = Object.keys(answers).filter(key => answers[key] !== undefined && answers[key] !== '').length;
  const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  const handleChange = (questionId: string, value: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('survey_id', survey.id);
    formData.append('answers', JSON.stringify(answers));
    if (!survey.anonymous && email.trim()) {
      formData.append('respondent_email', email.trim());
    }

    const result = await submitResponseAction(formData);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success('Thank you for your feedback!');
  };

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'rating':
        return <Star className="w-4 h-4 text-amber-500" />;
      case 'multiple_choice':
        return <MessageSquare className="w-4 h-4 dark:text-blue-500" />;
      case 'text':
        return <MessageSquare className="w-4 h-4 dark:text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-200 overflow-x-hidden selection:bg-emerald-500/30 font-sans antialiased">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCircles backgroundOnly className="opacity-40" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-10 ">
        <section className="pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[12px] font-medium text-emerald-400 uppercase tracking-wider mx-auto mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Feedback Session
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white mb-3">
            {survey.title || 'Share Your Feedback'}
          </h1>
          {survey.description && (
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">{survey.description}</p>
          )}
        </section>

        {totalQuestions > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-2 text-sm text-slate-600 dark:text-slate-300">
              <span>Progress</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{answeredQuestions} / {totalQuestions}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
            </div>
          </section>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {survey.questions?.map((q: SurveyQuestion, index: number) => (
              <Card key={index} className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 backdrop-blur-lg hover:border-emerald-400/40 transition-colors">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-emerald-600 dark:text-emerald-400">{getQuestionIcon(q.type)}</div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">{q.text}</h3>
                    {q.required && <span className="ml-auto text-xs font-semibold text-emerald-600 dark:text-emerald-300 uppercase tracking-wider">Required</span>}
                  </div>

                  {q.type === 'text' && (
                    <Textarea
                      placeholder="Share your thoughts here..."
                      className="w-full min-h-32 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/70 text-black dark:text-slate-100 focus:border-emerald-400 focus:ring-emerald-500/40"
                      onChange={e => handleChange(index.toString(), e.target.value)}
                      required={q.required}
                    />
                  )}

                  {q.type === 'multiple_choice' && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt: string, optIdx: number) => (
                        <label key={optIdx} className="flex items-center gap-2 p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/40 cursor-pointer hover:border-emerald-400">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={opt}
                            checked={answers[index.toString()] === opt}
                            onChange={() => handleChange(index.toString(), opt)}
                            className="h-4 w-4 accent-emerald-600"
                          />
                          <span className="text-sm text-slate-900 dark:text-slate-100">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'rating' && q.settings && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Array.from({ length: (q.settings?.max ?? 5) - (q.settings?.min ?? 1) + 1 }, (_, i) => (q.settings?.min ?? 1) + i).map(num => {
                        const isSelected = answers[index.toString()] === num;
                        const isHovered = hoveredRating === num;
                        return (
                          <button
                            key={num}
                            type="button"
                            onClick={() => handleChange(index.toString(), num)}
                            onMouseEnter={() => setHoveredRating(num)}
                            onMouseLeave={() => setHoveredRating(null)}
                            className={`w-11 h-11 rounded-lg flex items-center justify-center font-semibold transition ${isSelected ? 'bg-linear-to-br from-emerald-500 to-cyan-500 text-white shadow-lg scale-105' : isHovered ? 'bg-slate-200 dark:bg-slate-700 text-black dark:text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {!survey.anonymous && (
            <Card className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 backdrop-blur-lg">
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                  <h3 className="text-sm font-semibold text-black dark:text-white">Stay Connected</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Optional: Share your email so we can follow up.</p>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/70 text-black dark:text-slate-100 focus:border-emerald-400 focus:ring-emerald-500/40"
                />
              </div>
            </Card>
          )}

          <div className="pt-3">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-900/30"
            >
              {loading ? 'Submitting…' : 'Send Feedback'}
            </Button>
          </div>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">Your feedback is valuable and helps us improve. We appreciate you taking the time!</p>
        </form>
      </main>
    </div>
  );
}