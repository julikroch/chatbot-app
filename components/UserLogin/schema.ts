import * as z from 'zod';

export const formSchema = z.object({
  userName: z
    .string()
    .min(3, {
      message: 'Username must be at least 3 characters.',
    })
    .max(50, {
      message: 'Username must not exceed 50 characters.',
    }),
});
