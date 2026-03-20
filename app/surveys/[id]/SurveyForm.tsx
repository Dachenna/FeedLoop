// app/survey/[id]/SurveyForm.tsx
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { submitResponseAction } from '@/components/web/response'; // Adjust path

export default function SurveyForm({ survey }: { survey: any }) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (questionId: string, value: any) => {
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
    // Optional: reset form or show thank-you message
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {survey.questions?.map((q: any, index: number) => (
        <div key={index} className="space-y-3 border-b pb-6">
          <Label className="text-lg font-medium">
            {q.text} {q.required && <span className="text-red-500">*</span>}
          </Label>

          {q.type === 'text' && (
            <Textarea
              onChange={e => handleChange(index.toString(), e.target.value)}
              required={q.required}
            />
          )}

          {q.type === 'multiple_choice' && q.options && (
            <RadioGroup
              onValueChange={val => handleChange(index.toString(), val)}
              required={q.required}
            >
              {q.options.map((opt: string, optIdx: number) => (
                <div key={optIdx} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt} id={`${index}-${optIdx}`} />
                  <Label htmlFor={`${index}-${optIdx}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {q.type === 'rating' && q.settings && (
            <div className="flex flex-wrap gap-2">
              {Array.from(
                { length: q.settings.max - q.settings.min + 1 },
                (_, i) => q.settings.min + i
              ).map(num => (
                <Button
                  key={num}
                  type="button"
                  variant={answers[index.toString()] === num ? 'default' : 'outline'}
                  onClick={() => handleChange(index.toString(), num)}
                  className="w-10 h-10"
                >
                  {num}
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}

      {!survey.anonymous && (
        <div className="space-y-2">
          <Label htmlFor="email">Your email (optional)</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  );
}