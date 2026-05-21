'use client'
import { createContext, useContext, useState } from 'react';

type Question = {
  id: string
  type: 'text' | 'multiple_choice' | 'rating'
  text: string
  options?: string[]
  settings?: {
    min: number
    max: number
    lowLabel?: string
    highLabel?: string
  }
  required: boolean
  chartType?: 'pie' | 'bar' | 'histogram' | 'none'
}

type Survey = {
  id: string;
  title: string;
  description?: string;
  survey_type: string;
  status: string;
  anonymous: boolean;
  questions?: Question[];
  created_at: string;
};

interface SurveyContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  createdSurveyId: string | null;
  setCreatedSurveyId: (id: string | null) => void;
  showSuccessDialog: boolean;
  setShowSuccessDialog: (show: boolean) => void;
  surveyToEdit: Survey | null;
  setSurveyToEdit: (survey: Survey | null) => void;
}

const SurveyContext = createContext<SurveyContextType | null>(null);

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [createdSurveyId, setCreatedSurveyId] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [surveyToEdit, setSurveyToEdit] = useState<Survey | null>(null);

  return (
    <SurveyContext.Provider
      value={{
        open,
        setOpen,
        createdSurveyId,
        setCreatedSurveyId,
        showSuccessDialog,
        setShowSuccessDialog,
        surveyToEdit,
        setSurveyToEdit,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) throw new Error('useSurvey must be used within SurveyProvider');
  return context;
}