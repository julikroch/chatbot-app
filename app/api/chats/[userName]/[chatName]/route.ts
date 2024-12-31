import { type NextRequest, NextResponse } from 'next/server';
import { BOT_RESPONSES } from '@/common/constants';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { userName: string; chatName: string } },
) {
  try {
    const { userName, chatName } = params;

    if (typeof userName !== 'string' || typeof chatName !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const chat = await prisma.chat.findUnique({
      where: {
        userName,
        chatName,
      },
      include: {
        messages: true,
      },
    });

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found for that user' }, { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userName: string; chatName: string } },
) {
  const body = await req.json();
  const { content } = body;

  try {
    const { userName, chatName } = params;

    if (typeof userName !== 'string' || typeof chatName !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const chat = await prisma.chat.findUnique({
      where: {
        userName,
        chatName,
      },
    });

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found for that user' }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: {
        content,
        author: 'user',
        chat: {
          connect: {
            chatName,
          },
        },
        user: {
          connect: {
            userName,
          },
        },
      },
    });

    const randomBotResponse = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];

    const botMessage = await prisma.message.create({
      data: {
        content: randomBotResponse,
        author: 'bot',
        chat: {
          connect: {
            chatName,
          },
        },
        user: {
          connect: {
            userName,
          },
        },
      },
    });

    return NextResponse.json({ message, botMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
