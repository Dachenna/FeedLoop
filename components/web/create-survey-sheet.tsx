// components/survey/create-survey-sheet.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
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
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [surveyType, setSurveyType] = useState<SurveyType>('nps')
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [existingSurveys, setExistingSurveys] = useState<{ id: string; title: string; questions: Question[] }[]>([])

  const isEditing = !!surveyToEdit

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
      setTitle(surveyToEdit.title || '')
      setDescription(surveyToEdit.description || '')
      setSurveyType(surveyToEdit.survey_type as SurveyType || 'nps')
      setAnonymous(surveyToEdit.anonymous || false)
      setQuestions(surveyToEdit.questions?.map((q: any) => ({ ...q, id: q.id || crypto.randomUUID() })) || [])
    } else if (!surveyToEdit && open) {
      // Reset for new survey
      setTitle('')
      setDescription('')
      setSurveyType('nps')
      setAnonymous(false)
      setQuestions([])
    }
  }, [surveyToEdit, open])

  const handleImport = (qs: unknown) => {
    const parsed = typeof qs === 'string' ? JSON.parse(qs) : qs
    if (Array.isArray(parsed)) {
      setQuestions(parsed.map((q: unknown) => ({ ...q, id: crypto.randomUUID() } as Question)))
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
    if (active.id !== over?.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((q) => q.id === active.id)
        const newIndex = items.findIndex((q) => q.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
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
    setQuestions((prev) => [...prev, newQ])
  }

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    )
  }

  const addOption = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id && q.options
          ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }
          : q
      )
    )
  }

  const updateOption = (id: string, idx: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id && q.options
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === idx ? value : opt)),
            }
          : q
      )
    )
  }

  const updateRatingSetting = (id: string, key: keyof NonNullable<Question['settings']>, value: unknown) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id && q.settings
          ? { ...q, settings: { ...q.settings, [key]: value } }
          : q
      )
    )
  }

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
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

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('survey_type', surveyType)
    formData.append('anonymous', anonymous ? 'true' : 'false')
    if (!isEditing) {
      formData.append('status', 'draft')
    }
    formData.append('questions', JSON.stringify(questions.map((q, i) => ({
      ...q,
      position: i + 1,
    }))))

    try {
      const result = isEditing 
        ? await updateSurveyAction(formData, surveyToEdit.id)
        : await createSurveyAction(formData)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(isEditing ? 'Survey updated successfully!' : 'Survey created successfully!')
      // Reset form
      setTitle('')
      setDescription('')
      setSurveyType('nps')
      setAnonymous(false)
      setQuestions([])
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
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Customer Feedback" />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={surveyType} onValueChange={(v) => setSurveyType(v as SurveyType)}>
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
                    <Switch checked={anonymous} onCheckedChange={setAnonymous} />
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
  onUpdate: (id: string, field: keyof Question, value: any) => void
  onAddOption: (id: string) => void
  onUpdateOption: (id: string, idx: number, value: string) => void
  onUpdateRatingSetting: (id: string, key: keyof NonNullable<Question['settings']>, value: any) => void
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