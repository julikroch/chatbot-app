'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { createUser } from '@/common/api/mutations';
import { CommonPathnames } from '@/common/enums';
import type { User } from '@/common/types';
import { useUser } from '@/context/UserContext';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner,
} from '../ui';
import { LoginForm } from './enums';
import { formSchema } from './schema';

interface IProps {
  users: User[];
}

export const UserLogin: FC<IProps> = ({ users }) => {
  const router = useRouter();
  const { setUser } = useUser();

  const userMap = new Map(users.map(user => [user.userName.toLowerCase(), user]));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [LoginForm.UserName]: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const foundUser = userMap.get(values.userName.toLowerCase());

    if (foundUser) {
      setUser(foundUser);
      router.push(CommonPathnames.Chats);

      return;
    }

    const { user, error } = await createUser(values);

    if (error || !user) {
      return;
    }

    setUser(user);

    router.push(CommonPathnames.Chats);
  }

  return (
    <Card className="sm:w-10/12 lg:w-6/12 mx-auto mt-20">
      <CardHeader>
        <CardTitle>Enter your name to start chatting</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
          <FormField
            control={form.control}
            name={LoginForm.UserName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full my-6" disabled={form.formState.isSubmitting}>
            {form.formState.isLoading ? <Spinner size="sm" /> : 'Start chatting'}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
