import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const chats = await prisma.chat.findMany({
      include: {
        user: true,
        messages: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(chats);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch chat histories:', error);

    return NextResponse.json({ error: 'Failed to fetch chat histories' }, { status: 500 });
  }
}
