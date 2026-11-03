import { z } from 'zod'

// FR-60: shared by the form (inline errors) and /api/contact (NFR-31).
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name.')
    .max(100, 'Please keep your name shorter.'),
  email: z.email('Please enter a valid email address.').max(200),
  reason: z.enum(['job', 'freelance', 'other'], 'Please choose a reason.'),
  message: z
    .string()
    .trim()
    .min(20, 'Please write at least 20 characters.')
    .max(2000, 'Please keep your message under 2,000 characters.'),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string[]>>
