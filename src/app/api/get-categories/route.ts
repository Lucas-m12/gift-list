import { prisma } from "@/prisma-client";

export const GET = async () => {
  const categories = await prisma.categories.findMany();
  console.log({categories})
  return Response.json(categories);
}