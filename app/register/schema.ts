import * as z from 'zod';

import { RegisterForm } from './enums';

export const formSchema = z.object({
  [RegisterForm.UserName]: z
    .string()
    .trim()
    .min(3, { message: 'User name must be at least 3 characters.' })
    .max(50, { message: 'User name must not exceed 50 characters.' }),
});
