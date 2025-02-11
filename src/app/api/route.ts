import { prisma } from "@/prisma-client";
import crypto from "node:crypto";

export const POST = async (request: Request) => {
  const data = await request.json();
  await prisma.gifts.create({
    data: {
      id: crypto.randomUUID(),
      person: data.name,
      items: data.selectedItems,
    }
  });
  for (const item of data.selectedItems) {
    const product = await prisma.products.findFirst({
      where: {
        id: item.id,
      }
    })
    if (!product?.shouldRemove) {
      continue;
    }
    await prisma.products.update({
      where: { id: item.id },
      data: { isActive: false }
    });
  }
  return Response.json({ data });
}