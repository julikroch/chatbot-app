import type { Message } from '@/common/types';
import ChatComponent from '@/components/ChatboxContainer';

export default function Home() {
  // Why is this here?
  const initialMessages: Message[] = [];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to ChatBot!</h1>
        </div>
      </header>
      <main>
        <ChatComponent initialMessages={initialMessages} />
      </main>
    </div>
  );
}
