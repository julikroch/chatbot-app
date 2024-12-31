import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { userName: string } }) {
  try {
    const { userName } = params;

    if (typeof userName !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const chats = await prisma.chat.findMany({
      where: {
        userName,
      },
    });

    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
