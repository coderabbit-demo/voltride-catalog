# AGENTS.md — voltride-catalog

Part of VoltRide, a multi-repo microservices demo (see the `voltride-platform` repo for the system map). Every repo hand-maintains local copies of its peers' contracts — there is **no shared types package anywhere in VoltRide**, and nothing must ever change that. `src/types.ts` holds both this service's response shapes and its local view of inventory/pricing responses.

## Contracts this repo PRODUCES

| Contract | Consumer repo | Consumer file | Failure mode if changed |
|---|---|---|---|
| `GET /api/products/:id/summary` (`id`, `name`, `basePriceCents`, `category`) | voltride-cart | `src/clients/catalogClient.ts` | cart forwards `basePriceCents: undefined` to pricing → 422 → add-to-cart fails two repos away |
| `/summary` | voltride-notifications | `catalog_client.py` | email copy loses product names |
| `GET /api/products` + `/api/products/:id` | voltride-frontend | `src/api/catalog.ts` | grid/detail pages break |

## Contracts this repo CONSUMES (local copies in `src/types.ts`)

| Producer repo | Contract | Used in |
|---|---|---|
| voltride-inventory | stock record (`stockCount`, `restockEtaDays`) | `src/clients/inventoryClient.ts` |
| voltride-pricing | quote (`lineItems[].unitPriceCents/discountPercent`) | `src/clients/pricingClient.ts` |

**Changing any produced shape is a breaking change for the consumer repos above** — it cannot be fixed in this PR; open coordinated PRs and link them. When a producer repo changes, update the local copies here.

## Conventions

- Peer URLs via env vars (`INVENTORY_URL`, `PRICING_URL`) with localhost defaults; money is integer cents (`*Cents`).
- Verify with: `npx tsc --noEmit`, then `npm run dev` and curl the endpoints.
