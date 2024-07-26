import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(6, { message: 'Your Name must be at least 6 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  subject: z
    .string()
    .min(6, { message: 'Subject must be at least 6 characters long' }),
  message: z
    .string()
    .min(6, { message: 'Message must be at least 6 characters long' }),
});

export type FormSchema = z.infer<typeof formSchema>;
