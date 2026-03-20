'use client'
import { createContext, useContext, useState } from 'react';

type Survey = {
  id: string;
  title: string;
  survey_type: string;
  status: string;
  anonymous: boolean;
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