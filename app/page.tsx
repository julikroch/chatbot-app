import { Avatar, AvatarFallback, AvatarImage, Button, Input, Spinner } from '@/components/ui';

export default function Home() {
  return (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Input />
      <Button variant="default" size="default">
        Hello, World!
      </Button>
      <Spinner />
    </>
  );
}
