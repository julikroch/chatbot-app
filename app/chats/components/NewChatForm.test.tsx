import '@testing-library/jest-dom';

import { useCreateNewChat } from '@/common/api';
import { useUser } from '@/context';
import { useQueryClient } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { NewChatForm } from './NewChatForm';

jest.mock('../../../common/api');
jest.mock('../../../context');
jest.mock('@tanstack/react-query');

describe('NewChatForm', () => {
  const mockUser = 'testuser';
  const mockMutate = jest.fn();
  const mockInvalidateQueries = jest.fn();

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ user: mockUser });
    (useCreateNewChat as jest.Mock).mockReturnValue({ mutate: mockMutate, isLoading: false });
    (useQueryClient as jest.Mock).mockReturnValue({ invalidateQueries: mockInvalidateQueries });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the NewChatForm component', () => {
    render(<NewChatForm />);
    expect(screen.getByText('New chat')).toBeInTheDocument();
  });

  it('opens the dialog when "New chat" button is clicked', () => {
    render(<NewChatForm />);

    const button = screen.getByText('New chat');

    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByText('Enter the chat name to create a new chat.')).toBeInTheDocument();
  });

  it('displays loading spinner when submitting', () => {
    (useCreateNewChat as jest.Mock).mockReturnValue({ mutate: mockMutate, isLoading: true });
    render(<NewChatForm />);

    const newChatButton = screen.getByText('New chat');

    act(() => {
      fireEvent.click(newChatButton);
    });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
