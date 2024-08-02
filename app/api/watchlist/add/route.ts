import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, stockSymbol } = await request.json();

    if (!userId || !stockSymbol) {
      return NextResponse.json({ error: 'Missing userId or stockSymbol' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const stock = await prisma.stock.findUnique({ where: { symbol: stockSymbol } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!stock) {
      return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
    }

    const existingWatchlistEntry = await prisma.watchlist.findUnique({
      where: {
        userId_stockSymbol: {
          userId,
          stockSymbol,
        },
      },
    });

    if (existingWatchlistEntry) {
      return NextResponse.json({ error: 'Stock is already in watchlist' }, { status: 400 });
    }

    await prisma.watchlist.create({
      data: {
        userId,
        stockSymbol,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
