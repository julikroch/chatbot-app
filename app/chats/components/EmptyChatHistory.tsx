import { Alert, AlertDescription, AlertTitle } from '@/components/ui';

import { NewChatForm } from './NewChatForm';

export const EmptyChatHistory = () => (
  <Alert className="flex items-center justify-between">
    <div className="items-center">
      <AlertTitle>No chat histories found</AlertTitle>
      <AlertDescription>Start a new chat to see it here.</AlertDescription>
    </div>
    <NewChatForm />
  </Alert>
);
