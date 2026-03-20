'use client';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useSurvey } from '@/lib/contexts/survey-context';
import { CreateSurveySheetProps } from './create-survey-sheet';

export function CreateSurveyButton({open, onOpenChange}: CreateSurveySheetProps) {
  const { setOpen } = useSurvey();

  return (
    <Button size="lg" onClick={() => setOpen(true)} open={open} onOpenChange={onOpenChange}>
      <PlusCircle className="mr-2 h-5 w-5" />
      Create Your First Survey
    </Button>
  );
}