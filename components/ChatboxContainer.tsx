export default function ChatBoxContainer() {
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [input, setInput] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!input.trim()) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   setError(null);
  //   const newMessage: Message = {
  //     id: Date.now().toString(),
  //     content: input,
  //     author: MessageAuthorEnum.User,
  //     createdAt: new Date().toISOString(),
  //   };
  //   setMessages(prev => [...prev, newMessage]);
  //   setInput('');
  //   try {
  //     const response = await fetch('/api/chat', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ message: input, userName }),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to send message');
  //     }
  //     const data = await response.json();
  //     const botMessage: Message = {
  //       id: Date.now().toString(),
  //       content: data.message,
  //       author: MessageAuthorEnum.Bot,
  //       createdAt: new Date().toISOString(),
  //     };
  //     setMessages(prev => [...prev, botMessage]);
  //   } catch (err) {
  //     setError('Failed to send message. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // return (
  //   <Card className="w-full max-w-2xl mx-auto">
  //     <CardHeader>
  //       <CardTitle>Chat with Bot</CardTitle>
  //     </CardHeader>
  //     <Separator />
  //     <CardContent>
  //       <ScrollArea className="h-[60vh] w-full pr-4">
  //         {error && (
  //           <Alert variant="destructive" className="mb-4">
  //             <AlertTitle>Error</AlertTitle>
  //             <AlertDescription>{error}</AlertDescription>
  //           </Alert>
  //         )}
  //         {messages.map(message => (
  //           <div
  //             key={message.id}
  //             className={`flex mb-4 ${message.author === MessageAuthorEnum.User ? 'justify-end' : 'justify-start'}`}
  //           >
  //             <div
  //               className={`flex items-end ${message.author === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
  //             >
  //               <Avatar className="w-8 h-8">
  //                 <AvatarFallback>
  //                   {message.author === 'user' ? userName[0].toUpperCase() : 'B'}
  //                 </AvatarFallback>
  //               </Avatar>
  //               <div
  //                 className={`mx-2 py-3 px-4 rounded-lg ${
  //                   message.author === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
  //                 }`}
  //               >
  //                 {message.content}
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //         {isLoading && (
  //           <div className="flex justify-center items-center">
  //             <Spinner />
  //           </div>
  //         )}
  //       </ScrollArea>
  //     </CardContent>
  //     <Separator />
  //     <CardFooter>
  //       <form onSubmit={handleSubmit} className="flex w-full space-x-2">
  //         <Input
  //           value={input}
  //           onChange={e => setInput(e.target.value)}
  //           placeholder="Type your message..."
  //           className="flex-grow"
  //           disabled={isLoading}
  //         />
  //         <Button type="submit" disabled={isLoading}>
  //           {isLoading ? <Spinner className="h-4 w-4" /> : 'Send'}
  //         </Button>
  //       </form>
  //     </CardFooter>
  //   </Card>
  // );
}
