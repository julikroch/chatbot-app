import { useMutation } from '@tanstack/react-query';

import { createNewChat, createNewMessage, createUser } from './post';

export const useCreateUser = (
  userName: string,
  onSuccess: (response: { error: string | null }) => void,
) =>
  useMutation(() => createUser({ userName }), {
    onSuccess,
  });

export const useCreateNewChat = (
  userName: string,
  chatName: string,
  onSuccess: (response: { error: string | null }) => void,
) =>
  useMutation(() => createNewChat({ userName, chatName }), {
    onSuccess,
  });

export const useCreateNewMessage = (
  userName: string,
  chatName: string,
  content: string,
  onSuccess: (response: { error: string | null }) => void,
) =>
  useMutation(() => createNewMessage(userName, chatName, content), {
    onSuccess,
  });
