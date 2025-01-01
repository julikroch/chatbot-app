import '@testing-library/jest-dom';

import { useRouter } from 'next/navigation';
import { useCreateUser } from '@/common/api';
import { useUser } from '@/context';
import { render, screen } from '@testing-library/react';

import RegisterPage from './page';

jest.mock('../../common/api');
jest.mock('../../context');
jest.mock('next/navigation');

describe('RegisterPage', () => {
  const mockSetUser = jest.fn();
  const mockPush = jest.fn();
  const mockPostUser = jest.fn();

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ setUser: mockSetUser });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useCreateUser as jest.Mock).mockReturnValue({ mutate: mockPostUser, isLoading: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the register page', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Register with your user name to start chatting')).toBeInTheDocument();
  });

  it('displays loading spinner when submitting', () => {
    (useCreateUser as jest.Mock).mockReturnValue({ mutate: mockPostUser, isLoading: true });
    render(<RegisterPage />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
