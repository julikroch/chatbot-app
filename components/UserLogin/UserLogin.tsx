'use client';

import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { logger } from '@/common/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Card, CardHeader, CardTitle, Input } from '../ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { LoginForm } from './enums';
import { formSchema } from './schema';

export const UserLogin: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [LoginForm.UserName]: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    logger.info(JSON.stringify(values));
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
          <Button type="submit" className="w-full my-6" disabled={false}>
            Start chatting
          </Button>
        </form>
      </Form>
    </Card>
  );
};
