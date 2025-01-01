import type { FC } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';

import { NewChatForm } from '../NewChatForm';

interface IProps {
  isEditable: boolean;
}

export const EmptyChatsHistory: FC<IProps> = ({ isEditable }) => (
  <Alert className="flex items-center justify-between max-w-7xl mx-auto mt-6 py-6 sm:px-6 lg:px-8">
    <div className="items-center">
      <AlertTitle>No chat histories found</AlertTitle>
      <AlertDescription>Start a new chat to see it here.</AlertDescription>
    </div>
    {isEditable && <NewChatForm />}
  </Alert>
);
