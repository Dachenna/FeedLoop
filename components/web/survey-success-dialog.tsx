'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { useSurvey } from '@/lib/contexts/survey-context'

export function SurveySuccessDialog() {
  const router = useRouter()
  const { createdSurveyId, showSuccessDialog, setShowSuccessDialog } = useSurvey()

  const handleViewResponses = () => {
    if (createdSurveyId) {
      router.push(`/surveys/${createdSurveyId}/responses`)
      setShowSuccessDialog(false)
    }
  }

  const handleBackToList = () => {
    router.push('/surveys')
    setShowSuccessDialog(false)
  }

  return (
    <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl">Survey Created Successfully!</DialogTitle>
          <DialogDescription className="mt-3">
            Your survey is ready to collect feedback. View responses or go back to manage your surveys.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            onClick={handleBackToList}
            className="w-full sm:w-auto"
          >
            Back to Surveys
          </Button>
          <Button
            onClick={handleViewResponses}
            className="w-full sm:w-auto"
          >
            View Responses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
