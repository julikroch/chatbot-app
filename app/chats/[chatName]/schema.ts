import * as z from 'zod';

import { ChatboxFormNames } from './enums';

export const formSchema = z.object({
  [ChatboxFormNames.Message]: z
    .string()
    .min(1, {
      message: 'Chat name must be at least 1 character.',
    })
    .max(100, {
      message: 'Chat name must not exceed 100 characters.',
    }),
});
