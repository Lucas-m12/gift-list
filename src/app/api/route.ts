import { dbClient } from "@/supabase-client";

export const POST = async (request: Request) => {
  const data = await request.json();
  await dbClient.from("gifts").insert({
    person: data.name,
    items: data.selectedItens,
  });
  for (const item of data.selectedItens) {
    const product = await dbClient.from('products').select().eq("id", item.id).single();
    if (!product.data.shouldRemove) {
      continue;
    }
    await dbClient.from('products').update({ isActive: false }).eq("id", item.id);
  }
  return Response.json({ data });
}