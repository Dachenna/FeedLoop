import * as z from 'zod';

export const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(30),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long").max(30),
    
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, "Password is required"),
})

export const QuestionSchema = z.object({
  type: z.enum(['text', 'multiple_choice', 'rating']),
  text: z.string().min(1, 'Question text is required'),
  options: z.array(z.string().min(1)).min(2, 'At least 2 options').optional(),
  settings: z.object({
    min: z.number().int().min(1),
    max: z.number().int().min(2),
    lowLabel: z.string().optional(),
    highLabel: z.string().optional(),
  }).optional(),
  required: z.boolean(),
})

export const SurveySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  survey_type: z.enum(['nps', 'csat', 'open-ended', 'custom']),
  anonymous: z.boolean(),
  status: z.literal('draft'),
  questions: z.array(QuestionSchema).min(1, 'At least one question required'),
})

export const SubmitResponseSchema = z.object({
  survey_id: z.string().uuid(),
  answers: z.record(z.string(), z.any()),  // { question_id: answer_value }
  respondent_email: z.string().email().optional().nullable(),
});