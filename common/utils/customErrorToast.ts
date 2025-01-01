import { toast } from 'sonner';

/**
 * Generate custom error toast
 * @param message - error message
 */

export const customToast = (message: string) =>
  toast.error(message, {
    style: {
      background: '#ff0000',
      border: '1px solid #ff0000',
      color: '#fff',
    },
  });
