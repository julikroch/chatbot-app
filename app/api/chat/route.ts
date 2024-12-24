import { type NextRequest, NextResponse } from 'next/server';
import { BOT_RESPONSES } from '@/constants';
import { MessageAuthorEnum } from '@/enums';
import type { Message } from '@/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { message, userName } = await req.json();

    if (typeof message !== 'string' || typeof userName !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const randomResponse = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];

    // Check if the user exists, if not, create the user
    let user = await prisma.user.findFirst({
      where: { id: userName },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { id: userName, name: userName },
      });
    }

    // Create the chat and message
    const chat = await prisma.chat.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        messages: {
          create: [
            {
              content: message,
              author: MessageAuthorEnum.User,
              user: {
                connect: { id: user.id },
              },
            },
          ],
        },
      },
      include: {
        messages: true,
      },
    });

    const botMessage: Message = {
      id: chat.messages[0].id,
      content: randomResponse,
      author: MessageAuthorEnum.Bot,
      createdAt: chat.messages[0].createdAt.toISOString(),
    };

    return NextResponse.json({ message: botMessage.content });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in chat API:', error);

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
