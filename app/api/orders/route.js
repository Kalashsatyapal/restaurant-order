// app/api/orders/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            dish: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch orders' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, total } = body;

    const order = await prisma.order.create({
      data: {
        total,
        status: 'pending',
        items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            dishId: item.dishId,
          })),
        },
      },
    });

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
  }
}
