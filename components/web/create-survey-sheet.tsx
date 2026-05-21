// components/survey/create-survey-sheet.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from 'sonner'
import { createSurveyAction, updateSurveyAction } from "@/components/web/survey" 
import { Trash2, GripVertical } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useSurvey } from '@/lib/contexts/survey-context'

// dnd-kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

// Types
type SurveyType = 'nps' | 'csat' | 'open-ended' | 'custom'

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

export interface CreateSurveySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (surveyData: unknown) => void
}

export function CreateSurveySheet({ open, onOpenChange, onSave }: CreateSurveySheetProps) {
  const { surveyToEdit, setSurveyToEdit } = useSurvey()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    surveyType: 'nps' as SurveyType,
    anonymous: false,
    questions: [] as Question[],
  })
  const [loading, setLoading] = useState(false)
  const [existingSurveys, setExistingSurveys] = useState<{ id: string; title: string; questions: Question[] }[]>([])

  const isEditing = !!surveyToEdit

  // Destructure for easier access
  const { title, description, surveyType, anonymous, questions } = formData

  // Helper to update form data
  const updateFormData = useCallback((updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }, [])

  useEffect(() => {
    if (open) {
      const fetchSurveys = async () => {
        const supabase = createClient()
        const { data } = await supabase
          .from('surveys')
          .select('id, title, questions')
          .order('created_at', { ascending: false })
          .limit(5)
        
        if (data) setExistingSurveys(data)
      }
      fetchSurveys()
    }
  }, [open])

  useEffect(() => {
    if (surveyToEdit && open) {
      // eslint-disable-next-line
      updateFormData({
        title: surveyToEdit.title || '',
        description: surveyToEdit.description || '',
        surveyType: (surveyToEdit.survey_type as SurveyType) || 'nps',
        anonymous: surveyToEdit.anonymous || false,
        questions: surveyToEdit.questions?.map((q: Question) => ({
          ...q,
          id: q.id || crypto.randomUUID(),
        })) || [],
      })
    } else if (!surveyToEdit && open) {
      updateFormData({
        title: '',
        description: '',
        surveyType: 'nps',
        anonymous: false,
        questions: [],
      })
    }
  }, [surveyToEdit, open, updateFormData])

  const handleImport = (qs: unknown) => {
    const parsed = typeof qs === 'string' ? JSON.parse(qs) : qs
    if (Array.isArray(parsed)) {
      const importedQuestions = parsed.map((q: unknown) => {
        const question = q as Partial<Question>
        return { ...question, id: crypto.randomUUID() } as Question
      })
      updateFormData({ questions: importedQuestions })
      toast.success('Questions imported!')
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id)
      const newIndex = questions.findIndex((q) => q.id === over.id)
      const reorderedQuestions = arrayMove([...questions], oldIndex, newIndex)
      updateFormData({ questions: reorderedQuestions })
    }
  }

  const addQuestion = (type: Question['type']) => {
    const newQ: Question = {
      id: crypto.randomUUID(),
      type,
      text: '',
      required: false,
    }
    if (type === 'multiple_choice') newQ.options = ['Option 1', 'Option 2']
    if (type === 'rating') {
      newQ.settings = { min: 1, max: 5, lowLabel: 'Not satisfied', highLabel: 'Very satisfied' }
    }
    updateFormData({ questions: [...questions, newQ] })
  }

  const updateQuestion = (id: string, field: keyof Question, value: unknown) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id ? { ...q, [field]: value } : q
    )
    updateFormData({ questions: updatedQuestions })
  }

  const addOption = (id: string) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id && q.options
        ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
        : q
    )
    updateFormData({ questions: updatedQuestions })
  }

  const updateOption = (id: string, idx: number, value: string) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id && q.options
        ? {
            ...q,
            options: q.options.map((opt, i) => (i === idx ? value : opt)),
          }
        : q
    )
    updateFormData({ questions: updatedQuestions })
  }

  const updateRatingSetting = (
    id: string,
    key: keyof NonNullable<Question['settings']>,
    value: number | string
  ) => {
    const updatedQuestions = questions.map((q) =>
      q.id === id && q.settings
        ? { ...q, settings: { ...q.settings, [key]: value } }
        : q
    )
    updateFormData({ questions: updatedQuestions })
  }

  const removeQuestion = (id: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== id)
    updateFormData({ questions: updatedQuestions })
  }

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Survey title is required')
      return
    }

    if (questions.length === 0) {
      toast.error('Add at least one question')
      return
    }

    if (questions.some((q) => !q.text.trim())) {
      toast.error('All questions need text')
      return
    }

    setLoading(true)

    const submitData = new FormData()
    submitData.append('title', title)
    submitData.append('description', description)
    submitData.append('survey_type', surveyType)
    submitData.append('anonymous', anonymous ? 'true' : 'false')
    if (!isEditing) {
      submitData.append('status', 'draft')
    }
    submitData.append('questions', JSON.stringify(questions.map((q, i) => ({
      ...q,
      position: i + 1,
    }))))

    try {
      const result = isEditing 
        ? await updateSurveyAction(submitData, surveyToEdit.id)
        : await createSurveyAction(submitData)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(isEditing ? 'Survey updated successfully!' : 'Survey created successfully!')
      // Reset form
      updateFormData({
        title: '',
        description: '',
        surveyType: 'nps',
        anonymous: false,
        questions: [],
      })
      setSurveyToEdit(null)
      onSave?.({ title, description, surveyType, anonymous, questions })
      onOpenChange(false)
    } catch (err) {
      toast.error('Something went wrong. Try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <div className="flex flex-col h-full">
          <SheetHeader className="pb-4">
            <SheetTitle>{isEditing ? 'Edit Survey' : 'Create New Survey'}</SheetTitle>
            <SheetDescription>{isEditing ? 'Update your survey details.' : 'Build your feedback form quickly.'}</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto space-y-6 px-1">
            {/* Metadata */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={title} onChange={(e) => updateFormData({ title: e.target.value })} placeholder="e.g. Customer Feedback" />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => updateFormData({ description: e.target.value })} placeholder="Optional..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={surveyType} onValueChange={(v) => updateFormData({ surveyType: v as SurveyType })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nps">NPS</SelectItem>
                      <SelectItem value="csat">CSAT</SelectItem>
                      <SelectItem value="open-ended">Open-Ended</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end pb-2">
                  <div className="flex items-center space-x-2">
                    <Switch checked={anonymous} onCheckedChange={(checked) => updateFormData({ anonymous: checked })} />
                    <Label>Anonymous responses</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium">Questions *</Label>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => addQuestion('text')}>
                    + Text
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addQuestion('multiple_choice')}>
                    + Multiple Choice
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addQuestion('rating')}>
                    + Rating
                  </Button>
                </div>
              </div>

              {questions.length === 0 ? (
                existingSurveys.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      Start by adding a question above, or import from a previous survey:
                    </p>
                    <div className="space-y-2">
                      {existingSurveys.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                          onClick={() => handleImport(s.questions)}
                        >
                          <div className="font-medium truncate flex-1 mr-2">{s.title}</div>
                          <Button variant="ghost" size="sm" className="h-8">
                            Use
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed rounded-lg p-10 text-center text-muted-foreground">
                    Add your first question
                  </div>
                )
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={questions.map((q) => q.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                      {questions.map((q) => (
                        <SortableQuestion
                          key={q.id}
                          q={q}
                          onUpdate={updateQuestion}
                          onAddOption={addOption}
                          onUpdateOption={updateOption}
                          onUpdateRatingSetting={updateRatingSetting}
                          onRemove={removeQuestion}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>

          <SheetFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading || !title.trim() || questions.length === 0}>
              {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Survey' : 'Create Survey')}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ──────────────────────────────────────────────
// Sortable Question (unchanged except fix for required switch)
// ──────────────────────────────────────────────
function SortableQuestion({
  q,
  onUpdate,
  onAddOption,
  onUpdateOption,
  onUpdateRatingSetting,
  onRemove,
}: {
  q: Question
  onUpdate: (id: string, field: keyof Question, value: unknown) => void
  onAddOption: (id: string) => void
  onUpdateOption: (id: string, idx: number, value: string) => void
  onUpdateRatingSetting: (id: string, key: keyof NonNullable<Question['settings']>, value: number | string) => void
  onRemove: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: q.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="border rounded-lg p-4 bg-card shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        <Input
          value={q.text}
          onChange={(e) => onUpdate(q.id, 'text', e.target.value)}
          placeholder="Enter question..."
          className="flex-1"
        />

        <Switch
          checked={q.required}
          onCheckedChange={(checked) => onUpdate(q.id, 'required', checked)}
        />

        <Button variant="ghost" size="icon" onClick={() => onRemove(q.id)} className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Chart Type */}
      <div className="flex items-center gap-2 pl-8">
        <Label className="text-sm font-medium">Chart:</Label>
        <Select 
          value={q.chartType || 'none'} 
          onValueChange={(value) => onUpdate(q.id, 'chartType', value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="pie">Pie</SelectItem>
            <SelectItem value="bar">Bar</SelectItem>
            <SelectItem value="histogram">Histogram</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {q.type === 'multiple_choice' && (
        <div className="pl-8 space-y-3">
          <Label className="text-sm">Options</Label>
          {q.options?.map((opt, idx) => (
            <Input
              key={idx}
              value={opt}
              onChange={(e) => onUpdateOption(q.id, idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
            />
          ))}
          <Button variant="link" size="sm" onClick={() => onAddOption(q.id)}>
            + Add option
          </Button>
        </div>
      )}

      {q.type === 'rating' && q.settings && (
        <div className="pl-8 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Scale</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                value={q.settings.min}
                onChange={(e) => onUpdateRatingSetting(q.id, 'min', Number(e.target.value))}
                min={1}
                max={9}
                className="w-20"
              />
              <span>to</span>
              <Input
                type="number"
                value={q.settings.max}
                onChange={(e) => onUpdateRatingSetting(q.id, 'max', Number(e.target.value))}
                min={2}
                max={20}
                className="w-20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Labels (optional)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                value={q.settings.lowLabel || ''}
                onChange={(e) => onUpdateRatingSetting(q.id, 'lowLabel', e.target.value)}
                placeholder="Low end"
              />
              <Input
                value={q.settings.highLabel || ''}
                onChange={(e) => onUpdateRatingSetting(q.id, 'highLabel', e.target.value)}
                placeholder="High end"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}