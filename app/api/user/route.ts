import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userName } = await req.json();

    if (typeof userName !== 'string') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { userName },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userName = req.nextUrl.searchParams.get('userName');

  if (!userName) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
