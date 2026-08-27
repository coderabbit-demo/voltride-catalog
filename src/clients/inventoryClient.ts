import type { StockRecord } from "../types.js";

const INVENTORY_URL = process.env.INVENTORY_URL ?? "http://localhost:4003";

export async function getStock(productId: string): Promise<StockRecord | null> {
  const res = await fetch(`${INVENTORY_URL}/api/stock/${productId}`);
  if (!res.ok) return null;
  return (await res.json()) as StockRecord;
}

export async function getStockBatch(productIds: string[]): Promise<Map<string, StockRecord>> {
  const res = await fetch(`${INVENTORY_URL}/api/stock/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productIds }),
  });
  const map = new Map<string, StockRecord>();
  if (!res.ok) return map;
  const body = (await res.json()) as { items: StockRecord[] };
  for (const item of body.items) {
    map.set(item.productId, item);
  }
  return map;
}
