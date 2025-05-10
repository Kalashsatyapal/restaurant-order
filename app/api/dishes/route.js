import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const dishes = await prisma.dish.findMany({
    include: { category: true },
  });
  return new Response(JSON.stringify(dishes), { status: 200 });
}

export async function POST(request) {
  const data = await request.json();
  const dish = await prisma.dish.create({ data });
  return new Response(JSON.stringify(dish), { status: 201 });
}
