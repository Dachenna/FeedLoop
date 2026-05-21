'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useSurvey } from '@/lib/contexts/survey-context';

export function CreateSurveyButton() {
  const { setOpen } = useSurvey();

  return (
    <Button size="lg" onClick={() => setOpen(true)}>
      <PlusCircle className="mr-2 h-5 w-5" />
      Create Your First Survey
    </Button>
  );
}