import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Separator,
} from '@/components/ui';
import type { Chat } from '@/types';

interface ChatHistoryCardProps {
  chat: Chat;
}

export default function ChatHistoryCard({ chat }: ChatHistoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarFallback>{chat.user.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          {chat.user.name}&apos;s Chat
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[200px]">
          {chat.messages.map(message => (
            <div key={message.id} className="mb-2 flex items-start">
              <Avatar className="w-6 h-6 mr-2">
                <AvatarFallback>
                  {message.author === 'user' ? chat.user.name[0].toUpperCase() : 'B'}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="font-semibold">
                  {message.author === 'user' ? chat.user.name : 'Bot'}:{' '}
                </span>
                <span>{message.content}</span>
                <span className="text-sm text-muted-foreground ml-2">
                  {new Date(message.createdAt).toDateString()}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
