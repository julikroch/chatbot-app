import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userName } = await req.json();

    if (typeof userName !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: { userName },
      include: { chats: true },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: {
        chats: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}