import type { Quote } from "../types.js";

const PRICING_URL = process.env.PRICING_URL ?? "http://localhost:4005";

export async function getQuote(
  productId: string,
  basePriceCents: number,
  quantity: number,
): Promise<Quote | null> {
  const res = await fetch(`${PRICING_URL}/api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [{ productId, basePriceCents, quantity }],
      promoCode: null,
    }),
  });
  if (!res.ok) return null;
  return (await res.json()) as Quote;
}
