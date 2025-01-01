import '@testing-library/jest-dom';

import { MessageAuthor } from '@/common/enums';
import type { Message } from '@/common/types';
import { render, screen } from '@testing-library/react';

import { ChatHistory } from './ChatHistory';

describe('ChatHistory', () => {
  const mockMessage: Message = {
    id: '1',
    author: MessageAuthor.User,
    content: 'Hello, this is a test message.',
    chatName: 'TestChat',
    createdAt: new Date().toISOString(),
  };
  const mockUserName = 'TestUser';

  it('renders user message correctly', () => {
    render(<ChatHistory message={mockMessage} userName={mockUserName} />);

    const messageContent = screen.getByText(mockMessage.content);
    const avatarFallback = screen.getByText(mockUserName[0].toUpperCase());

    expect(messageContent).toBeInTheDocument();
    expect(avatarFallback).toBeInTheDocument();
    expect(messageContent).toHaveClass('bg-primary text-primary-foreground');
  });

  it('renders bot message correctly', () => {
    const botMessage: Message = {
      ...mockMessage,
      author: MessageAuthor.Bot,
    };

    render(<ChatHistory message={botMessage} userName={mockUserName} />);

    const messageContent = screen.getByText(botMessage.content);
    const avatarFallback = screen.getByText('B');

    expect(messageContent).toBeInTheDocument();
    expect(avatarFallback).toBeInTheDocument();
    expect(messageContent).toHaveClass('bg-muted');
  });

  it('applies correct styles for user message', () => {
    render(<ChatHistory message={mockMessage} userName={mockUserName} />);

    const messageContainer = screen.getByText(mockMessage.content).parentElement?.parentElement;

    expect(messageContainer).toHaveClass('justify-end');
    expect(messageContainer?.firstChild).toHaveClass('flex-row-reverse');
  });

  it('applies correct styles for bot message', () => {
    const botMessage: Message = {
      ...mockMessage,
      author: MessageAuthor.Bot,
    };

    render(<ChatHistory message={botMessage} userName={mockUserName} />);

    const messageContainer = screen.getByText(botMessage.content).parentElement?.parentElement;

    expect(messageContainer).toHaveClass('justify-start');
    expect(messageContainer?.firstChild).toHaveClass('flex-row');
  });
});
