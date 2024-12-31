'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { useCreateUser } from '@/common/api';
import { CommonPathnames } from '@/common/enums';
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
} from '@/common/ui';
import { customToast } from '@/common/utils';
import { useUser } from '@/context';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterForm } from './enums';
import { formSchema } from './schema';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [RegisterForm.UserName]: '',
    },
  });

  const { mutate: postUser, isLoading } = useCreateUser(
    form.getValues(RegisterForm.UserName),
    response => {
      if (response.error) {
        // Not so sure if this is an util, check to move it
        return customToast(response.error);
      }

      setUser(form.getValues(RegisterForm.UserName));

      router.push(CommonPathnames.Chats);
    },
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    postUser();
  }

  return (
    <Card className="sm:w-10/12 lg:w-6/12 mx-auto mt-20">
      <CardHeader>
        <CardTitle>Register with your user name to start chatting</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
          <FormField
            control={form.control}
            name={RegisterForm.UserName}
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
            {form.formState.isLoading || isLoading ? <Spinner size="sm" /> : 'Start chatting'}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
