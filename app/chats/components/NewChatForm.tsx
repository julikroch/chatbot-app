import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { useCreateNewChat } from '@/common/api';
import { RqKeys } from '@/common/enums';
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
} from '@/common/ui';
import { customToast } from '@/common/utils';
import { useUser } from '@/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useQueryClient } from '@tanstack/react-query';

import { NewChatFormNames } from '../enums';
import { formSchema } from '../schema';

export const NewChatForm = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = useQueryClient();

  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [NewChatFormNames.ChatName]: '',
    },
  });

  const { mutate, isLoading } = useCreateNewChat(
    user as string,
    form.getValues(NewChatFormNames.ChatName),
    response => {
      if (response.error) {
        return customToast(response.error);
      }

      queryClient.invalidateQueries([RqKeys.CHATS, user]);

      setOpenDialog(false);

      form.reset();
    },
  );

  const onSubmit = async () => {
    mutate();
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
        <DialogDescription>Enter the chat name to create a new chat.</DialogDescription>
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
                  {isLoading ? <Spinner size="sm" /> : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
