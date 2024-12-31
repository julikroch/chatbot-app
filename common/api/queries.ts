import { useQuery } from '@tanstack/react-query';

import { RqKeys } from '../enums';
import { getChat, getChats, getUser } from './get';

export const useGetUser = (
  userName: string,
  enabled: boolean,
  onSuccess?: (response: { error: string | null }) => void,
) =>
  useQuery([RqKeys.USERS, userName], () => getUser(userName), {
    enabled,
    onSuccess,
  });

export const useGetChats = (userName: string, enabled: boolean) =>
  useQuery([RqKeys.CHATS, userName], () => getChats(userName), {
    enabled,
  });

export const useGetChat = (userName: string, chatName: string, enabled: boolean) =>
  useQuery([RqKeys.CHATS, userName, chatName], () => getChat(userName, chatName), {
    enabled,
  });
