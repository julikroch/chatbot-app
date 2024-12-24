'use client';

import { type FormEvent, useState } from 'react';
import { MessageAuthorEnum } from '@/common/enums';
import type { ChatComponentProps, Message } from '@/common/types';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  ScrollArea,
  Separator,
  Spinner,
} from '@/components/ui';

export default function ChatBoxContainer({ initialMessages = [] }: ChatComponentProps) {
  // To much useStates
  const [userName, setUserName] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      author: MessageAuthorEnum.User,
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userName }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        author: MessageAuthorEnum.Bot,
        createdAt: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (userName.trim()) {
      setIsNameSubmitted(true);
    }
  };

  if (!isNameSubmitted) {
    return (
      <Card className="w-[350px] mx-auto mt-20">
        <CardHeader>
          <CardTitle>Enter your name to start chatting</CardTitle>
        </CardHeader>
        <form onSubmit={handleNameSubmit}>
          <CardContent>
            <Input
              type="text"
              placeholder="Your name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="mb-4"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!userName.trim()}>
              Start Chatting
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Chat with Bot</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[60vh] w-full pr-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.author === MessageAuthorEnum.User ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-end ${message.author === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {message.author === 'user' ? userName[0].toUpperCase() : 'B'}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`mx-2 py-3 px-4 rounded-lg ${
                    message.author === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Spinner className="h-4 w-4" /> : 'Send'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
