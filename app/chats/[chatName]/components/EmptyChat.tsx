import { Alert, AlertDescription, AlertTitle } from '@/common/ui';

export const EmptyChat = () => (
  <Alert className="flex items-center justify-between border-0 px-0 py-5">
    <div className="items-center">
      <AlertTitle>No messages</AlertTitle>
      <AlertDescription>Please start chatting to see messages here.</AlertDescription>
    </div>
  </Alert>
);
