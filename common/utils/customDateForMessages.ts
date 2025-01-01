/**
 * Custom date format for messages
 * @param date - date string
 * @returns formatted date
 */

export const customDateFormat = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
