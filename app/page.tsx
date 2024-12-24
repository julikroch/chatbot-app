import ChatComponent from '@/components/ChatboxContainer';
import type { Message } from '@/types';

export default function Home() {
  // Why is this here?
  const initialMessages: Message[] = [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Chat Application</h1>
      <ChatComponent initialMessages={initialMessages} />
    </div>
  );
}
