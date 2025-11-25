export function handleError(err) {
  console.error("ERROR:", err);
  return new Response("❌ Something went wrong", { status: 500 });
}
