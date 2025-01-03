import * as z from 'zod';

import { LoginForm } from './enums';

export const formSchema = z.object({
  [LoginForm.UserName]: z
    .string()
    .min(3, { message: 'User name must be at least 3 characters.' })
    .max(50, { message: 'User name must not exceed 50 characters.' }),
});
