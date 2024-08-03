import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(6, { message: 'Your Name must be at least 6 characters long' }),
  lastName: z
    .string()
    .min(6, { message: 'Last Name must be at least 6 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  subject: z.string().optional(),
  message: z
    .string()
    .min(6, { message: 'Message must be at least 6 characters long' }),
  companyName: z.string().optional(),
  zipCode: z
    .string()
    .length(8, { message: 'ZIP code must be exactly 8 characters long' }),
  country: z.string().min(1, { message: 'Country is required' }),
  streetAddress: z.string().min(1, { message: 'Street address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  province: z.string().min(1, { message: 'Province is required' }),
  addOnAddress: z.string().email({ message: 'Invalid email address' }),
});

export type FormSchema = z.infer<typeof formSchema>;
