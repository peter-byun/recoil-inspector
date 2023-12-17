export async function GET(request: Request) {
  return Response.json({
    cards: [
      {
        content: 'First Card',
      },
      {
        content: 'Second Card',
      },
      {
        content: 'Third Card',
      },
    ],
  });
}
