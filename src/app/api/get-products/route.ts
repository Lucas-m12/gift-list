import { prisma } from "@/prisma-client";

export const GET = async () => {
  try {
    const products = await prisma.products.findMany({
      include: {
        categories: true,
      },
      orderBy: [
        {
          shouldRemove: "asc",
        },
        {
          name: "asc"
        }
      ]
    });
  
    return Response.json(products.map(product => ({
      ...product,
      categories: product.categories.map(category => category.id),
    })));
  } catch (error) {
    console.log(error);
    return Response.json([]);
  }
}