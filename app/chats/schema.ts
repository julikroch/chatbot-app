import * as z from 'zod';

import { NewChatFormNames } from './enums';

export const formSchema = z.object({
  [NewChatFormNames.ChatName]: z
    .string()
    .min(3, {
      message: 'Chat name must be at least 3 characters.',
    })
    .max(50, {
      message: 'Chat name must not exceed 50 characters.',
    }),
});
