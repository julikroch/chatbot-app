'use client';

import { redirect, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { useCreateNewMessage, useGetChat } from '@/common/api';
import { CommonPathnames, RqKeys } from '@/common/enums';
import { customToast } from '@/common/utils';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  ScrollArea,
  Separator,
  Spinner,
} from '@/components/ui';
import { useUser } from '@/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { ChatHistory, EmptyChat } from './components';
import { ChatboxFormNames } from './enums';
import { formSchema } from './schema';

export default function Chat() {
  const { user } = useUser();

  if (!user) {
    redirect(CommonPathnames.Home);
  }

  const queryClient = useQueryClient();

  const params = useParams();

  const decodedChatName = params.chatName ? decodeURIComponent(params.chatName as string) : '';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [ChatboxFormNames.Message]: '',
    },
  });

  const { data, isLoading: isLoadingMessages } = useGetChat(
    user,
    decodedChatName,
    !!user && !!decodedChatName,
  );

  const { mutate, isLoading: isSendingMessage } = useCreateNewMessage(
    user,
    decodedChatName,
    form.getValues(ChatboxFormNames.Message),
    response => {
      if (response.error) {
        return customToast(response.error);
      }

      queryClient.invalidateQueries([RqKeys.CHATS, user, decodedChatName]);

      form.reset();
    },
  );

  async function onSubmit() {
    mutate();
  }

  if (isLoadingMessages) {
    return (
      <div className="w-full max-w-7xl mx-auto flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>{decodedChatName}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[60vh] w-full pr-4">
          {!data?.chat?.messages.length ? (
            <EmptyChat />
          ) : (
            data.chat.messages.map(message => (
              <ChatHistory key={message.id} message={message} userName={user} />
            ))
          )}
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-start pt-6 w-full">
            <FormField
              control={form.control}
              name={ChatboxFormNames.Message}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mx-2" disabled={form.formState.isSubmitting}>
              {isSendingMessage ? <Spinner size="sm" /> : 'Send'}
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
