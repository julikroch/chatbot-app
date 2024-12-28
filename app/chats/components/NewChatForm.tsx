import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type * as z from 'zod';
import { createNewChat } from '@/common/api/mutations';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner,
} from '@/components/ui';
import { useUser } from '@/context';
import { zodResolver } from '@hookform/resolvers/zod';

import { NewChatFormNames } from '../enums';
import { formSchema } from '../schema';

export const NewChatForm = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [NewChatFormNames.ChatName]: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await createNewChat({
      userName: user?.userName as string,
      chatName: values.chatName,
    });

    if (error) {
      return toast.error(error, {
        style: {
          background: '#ff0000',
          border: '1px solid #ff0000',
          color: '#fff',
        },
      });
    }

    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="default">New chat</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new chat</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name={NewChatFormNames.ChatName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chat name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the chat name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full my-6"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isLoading ? <Spinner size="sm" /> : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
