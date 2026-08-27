// Catalog's own view of its contracts, plus local copies of what it
// expects back from inventory and pricing. There is intentionally no
// shared types package in this repo.

export interface ProductSpecs {
  motorWatts: number;
  batteryWh: number;
  rangeKm: number;
  weightKg: number;
  topSpeedKph: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  basePriceCents: number;
  imageUrl: string;
  specs: ProductSpecs;
}

// What catalog expects from inventory's GET /api/stock/:id and /api/stock/batch.
export interface StockRecord {
  productId: string;
  stockCount: number;
  warehouse: string;
  restockEtaDays: number;
}

// What catalog expects from pricing's POST /api/quotes (only the fields it uses).
export interface QuoteLineItem {
  productId: string;
  unitPriceCents: number;
  quantity: number;
  discountPercent: number;
  lineTotalCents: number;
}

export interface Quote {
  lineItems: QuoteLineItem[];
  subtotalCents: number;
  grandTotalCents: number;
}

// Response shapes catalog serves.
export interface ProductSummaryResponse {
  id: string;
  name: string;
  basePriceCents: number;
  category: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  basePriceCents: number;
  imageUrl: string;
  inStock: boolean;
  stockCount: number;
}

export interface ProductDetailResponse extends Product {
  stockCount: number;
  restockEtaDays: number;
  pricing: {
    unitPriceCents: number;
    discountPercent: number;
    surchargePercent: number;
  };
}
