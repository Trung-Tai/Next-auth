import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function handler(req: NextRequest) {
  try {
    const groups = await prisma.group.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ message: 'Error fetching groups', error: (error as Error).message }, { status: 500 });
  }
}

export { handler as GET };