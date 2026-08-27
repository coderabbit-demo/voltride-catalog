import type { Product } from "./types.js";

export const products: Product[] = [
  {
    id: "volt-vaquero",
    name: "Volt Vaquero",
    tagline: "The electric cowboy of city streets",
    description:
      "A nimble commuter with a hidden battery, hydraulic disc brakes, and enough torque to make every green light feel like a rodeo gate.",
    category: "commuter",
    basePriceCents: 249900,
    imageUrl: "/images/volt-vaquero.svg",
    specs: { motorWatts: 500, batteryWh: 630, rangeKm: 90, weightKg: 22.5, topSpeedKph: 32 },
  },
  {
    id: "thunder-pedal",
    name: "Thunder Pedal Pro",
    tagline: "Full suspension. Full send.",
    description:
      "Trail-ready e-MTB with 160mm of travel, a torque-sensing mid-drive, and a frame that shrugs off rock gardens.",
    category: "mountain",
    basePriceCents: 389900,
    imageUrl: "/images/thunder-pedal.svg",
    specs: { motorWatts: 750, batteryWh: 720, rangeKm: 75, weightKg: 24.8, topSpeedKph: 40 },
  },
  {
    id: "watt-wanderer",
    name: "Watt Wanderer",
    tagline: "Coast to coast on one charge (almost)",
    description:
      "Touring geometry, integrated racks, and a range-extender port for riders who think a century is a warm-up.",
    category: "touring",
    basePriceCents: 299900,
    imageUrl: "/images/watt-wanderer.svg",
    specs: { motorWatts: 500, batteryWh: 900, rangeKm: 140, weightKg: 26.1, topSpeedKph: 32 },
  },
  {
    id: "ampere-al-fresco",
    name: "Ampere Al Fresco",
    tagline: "Hauls groceries, kids, and opinions",
    description:
      "Long-tail cargo bike with dual battery bays, a 200kg payload rating, and running boards for two small passengers.",
    category: "cargo",
    basePriceCents: 459900,
    imageUrl: "/images/ampere-al-fresco.svg",
    specs: { motorWatts: 750, batteryWh: 1000, rangeKm: 110, weightKg: 34.2, topSpeedKph: 32 },
  },
  {
    id: "circuit-breaker-xl",
    name: "Circuit Breaker XL",
    tagline: "The downhill dominator",
    description:
      "Enduro-spec monster with a 29er front wheel, coil shock, and a motor tune that flirts with the legal limit.",
    category: "mountain",
    basePriceCents: 529900,
    imageUrl: "/images/circuit-breaker-xl.svg",
    specs: { motorWatts: 850, batteryWh: 840, rangeKm: 65, weightKg: 25.9, topSpeedKph: 45 },
  },
  {
    id: "sparrow-glide",
    name: "Sparrow Glide",
    tagline: "Folds smaller than your excuses",
    description:
      "A 16-inch folding commuter that fits under a desk, on a train rack, or in the trunk of the smallest hatchback.",
    category: "folding",
    basePriceCents: 179900,
    imageUrl: "/images/sparrow-glide.svg",
    specs: { motorWatts: 350, batteryWh: 360, rangeKm: 50, weightKg: 16.4, topSpeedKph: 25 },
  },
  {
    id: "joule-junior",
    name: "Joule Junior",
    tagline: "First watts for future legends",
    description:
      "A kid-sized e-bike with parental speed caps, chunky tires, and a battery that outlasts any attention span.",
    category: "kids",
    basePriceCents: 99900,
    imageUrl: "/images/joule-junior.svg",
    specs: { motorWatts: 250, batteryWh: 250, rangeKm: 35, weightKg: 12.7, topSpeedKph: 20 },
  },
];

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
