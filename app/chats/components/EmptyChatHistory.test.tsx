import '@testing-library/jest-dom';

import { UserProvider } from '@/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';

import { EmptyChatHistory } from './EmptyChatHistory';

const queryClient = new QueryClient();

describe('EmptyChatHistory', () => {
  it('should render the component with the correct message', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <EmptyChatHistory />
        </UserProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByText('No chat histories found')).toBeInTheDocument();
  });
});