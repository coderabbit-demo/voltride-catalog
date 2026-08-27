import express from "express";
import { products, findProduct } from "./products.js";
import { getStock, getStockBatch } from "./clients/inventoryClient.js";
import { getQuote } from "./clients/pricingClient.js";
import type { ProductDetailResponse, ProductListItem, ProductSummaryResponse } from "./types.js";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "catalog" });
});

// Product grid: enriched with live stock from inventory.
app.get("/api/products", async (_req, res) => {
  const stockMap = await getStockBatch(products.map((p) => p.id));
  const items: ProductListItem[] = products.map((p) => {
    const stock = stockMap.get(p.id);
    const stockCount = stock?.stockCount ?? 0;
    return {
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      category: p.category,
      basePriceCents: p.basePriceCents,
      imageUrl: p.imageUrl,
      inStock: stockCount > 0,
      stockCount,
    };
  });
  res.json({ products: items });
});

// Lightweight inter-service endpoint: cart and notifications use this to
// validate products and read names/base prices.
app.get("/api/products/:id/summary", (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    res.status(404).json({ error: "product_not_found" });
    return;
  }
  const summary: ProductSummaryResponse = {
    id: product.id,
    name: product.name,
    basePriceCents: product.basePriceCents,
    category: product.category,
  };
  res.json(summary);
});

// Product detail: enriched with stock (inventory) and a single-unit quote (pricing).
app.get("/api/products/:id", async (req, res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    res.status(404).json({ error: "product_not_found" });
    return;
  }

  const [stock, quote] = await Promise.all([
    getStock(product.id),
    getQuote(product.id, product.basePriceCents, 1),
  ]);

  const line = quote?.lineItems[0];
  const discountPercent = line?.discountPercent ?? 0;
  const detail: ProductDetailResponse = {
    ...product,
    stockCount: stock?.stockCount ?? 0,
    restockEtaDays: stock?.restockEtaDays ?? 0,
    pricing: {
      unitPriceCents: line?.unitPriceCents ?? product.basePriceCents,
      discountPercent: Math.max(discountPercent, 0),
      surchargePercent: discountPercent < 0 ? -discountPercent : 0,
    },
  };
  res.json(detail);
});

const port = Number(process.env.PORT ?? 4001);
app.listen(port, () => {
  console.log(`catalog service listening on http://localhost:${port}`);
});
