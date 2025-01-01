import { toast } from 'sonner';

export const customToast = (message: string) =>
  toast.error(message, {
    style: {
      background: '#ff0000',
      border: '1px solid #ff0000',
      color: '#fff',
    },
  });
