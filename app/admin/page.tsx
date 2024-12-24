import ChatHistoryCard from '@/components/ChatHistoryCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';
import type { Chat } from '@/types';

async function getChatHistories(): Promise<Chat[]> {
  // Check this URL
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat-histories`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chat histories');
  }

  return response.json();
}

export default async function AdminPage() {
  let chats: Chat[] | null = null;
  let error: string | null = null;

  try {
    chats = await getChatHistories();
  } catch (e) {
    error = 'Failed to load chat histories. Please try again later.';
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!chats || chats.length === 0) {
    return (
      <Alert>
        <AlertTitle>No chat histories found</AlertTitle>
        <AlertDescription>Start a new chat to see it here.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chat Histories</h2>
      <div className="grid gap-4">
        {chats.map(chat => (
          <ChatHistoryCard key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
