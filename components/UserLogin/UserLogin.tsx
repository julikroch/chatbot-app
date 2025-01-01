'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { useGetUser } from '@/common/api';
import { CommonPathnames } from '@/common/enums';
import { customToast } from '@/common/utils';
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
  Link,
  Spinner,
} from '@/components/ui';
import { useUser } from '@/context/UserContext';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginForm } from './enums';
import { formSchema } from './schema';

export const UserLogin = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [submittedUserName, setSubmittedUserName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [LoginForm.UserName]: '',
    },
  });

  useGetUser(submittedUserName as string, !!submittedUserName, response => {
    if (response?.error) {
      return customToast(response.error);
    }

    setUser(submittedUserName as string);

    router.push(CommonPathnames.Chats);
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmittedUserName(values.userName);
  }

  return (
    <Card className="sm:w-10/12 lg:w-6/12 mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login with your user name to start chatting</CardTitle>
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
      <p className=" text-center mb-4">
        Don&apos;t have a username?{' '}
        <Link
          text="Register now"
          className="hover:opacity-60 ease-in"
          href={CommonPathnames.Register}
        />
      </p>
    </Card>
  );
};
