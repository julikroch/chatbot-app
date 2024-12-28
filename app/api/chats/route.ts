import { type NextRequest, NextResponse } from 'next/server';
import { logger } from '@/common/utils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userName, chatName } = await req.json();

    if (typeof userName !== 'string' || typeof chatName !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Validate if the user exists on db
    const user = await prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate if that chat name already exists for that user
    const chat = await prisma.chat.findFirst({
      where: {
        chatName,
        userName: user.userName,
      },
    });

    if (chat) {
      return NextResponse.json({ error: 'Chat name already exists' }, { status: 400 });
    }

    const newChat = await prisma.chat.create({
      data: {
        chatName,
        user: {
          connect: { userName },
        },
      },
    });

    return NextResponse.json(newChat);
  } catch (error) {
    logger.error(error as Error);

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
