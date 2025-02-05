import { prisma } from "@/prisma-client";

export const GET = async () => {
  const products = await prisma.products.findMany({
    include: {
      categories: true,
    }
  });

  return Response.json(products.map(product => ({
    ...product,
    categories: product.categories.map(category => category.id),
  })));
}