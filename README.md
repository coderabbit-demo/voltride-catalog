# ⚡ voltride-catalog

Product catalog for the [VoltRide](https://github.com/coderabbit-demo/voltride-platform) e-bike store. Node/TypeScript (Express), in-memory data. Runs on **port 4001**.

Enriches product responses with live stock from [voltride-inventory](https://github.com/coderabbit-demo/voltride-inventory) and computed prices from [voltride-pricing](https://github.com/coderabbit-demo/voltride-pricing). Its `/summary` endpoint is an inter-service contract consumed by [voltride-cart](https://github.com/coderabbit-demo/voltride-cart) and [voltride-notifications](https://github.com/coderabbit-demo/voltride-notifications); the list/detail endpoints are consumed by [voltride-frontend](https://github.com/coderabbit-demo/voltride-frontend). See `AGENTS.md` before changing any shape.

## Endpoints

- `GET /health`
- `GET /api/products` → product grid data (with `inStock`/`stockCount` from inventory)
- `GET /api/products/:id` → full detail (specs + stock + pricing)
- `GET /api/products/:id/summary` → `{ id, name, basePriceCents, category }` (inter-service)

## Run

```sh
npm install
npm run dev       # tsx watch, port 4001; PORT/INVENTORY_URL/PRICING_URL env vars supported
```

To run the whole VoltRide system, use the scripts in [voltride-platform](https://github.com/coderabbit-demo/voltride-platform).
