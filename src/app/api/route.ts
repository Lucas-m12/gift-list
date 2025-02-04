export const POST = async (request: Request) => {
  const data = await request.json();
  console.log({data});
  return Response.json({ data });
}