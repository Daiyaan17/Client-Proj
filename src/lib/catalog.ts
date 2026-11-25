export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  spec: string;
  price: number; // in INR
  originalPrice?: number;
  rating: number;
  inStock: boolean;
  image: string;
  badge?: "New" | "-50%" | "BestSeller" | "Hot" | "Sale";
  description: string;
};

export const CATEGORIES = [
  { id: "wires-cables", name: "Wires & Cables", icon: "Cable", count: 24 },
  { id: "switches-sockets", name: "Switches & Sockets", icon: "ToggleLeft", count: 38 },
  { id: "mcbs-db", name: "MCBs & DB Boxes", icon: "ShieldAlert", count: 18 },
  { id: "lighting", name: "LED & Industrial Lights", icon: "Lightbulb", count: 42 },
  { id: "fans-coolers", name: "Fans & Ventilation", icon: "Fan", count: 15 },
  { id: "motors-pumps", name: "Motors & Water Pumps", icon: "Cpu", count: 12 },
  { id: "tools-safety", name: "Electrician Tools & Safety", icon: "Wrench", count: 29 },
  { id: "conduits-pipes", name: "PVC Conduits & Accessories", icon: "Layers", count: 16 },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "FR House Wiring Copper Cable 1.5 sq mm",
    category: "Wires & Cables",
    brand: "Finolex / Havells",
    spec: "90m Coil, Flame Retardant 1100V",
    price: 1850,
    originalPrice: 2250,
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    badge: "-50%",
    description: "Multi-strand electrolytic grade copper conductor insulated with specially formulated flame retardant (FR) PVC compound for safe domestic wiring."
  },
  {
    id: "prod-2",
    name: "Heavy Duty FR Wiring Cable 2.5 sq mm",
    category: "Wires & Cables",
    brand: "Polycab",
    spec: "90m Coil, High Insulation Resistance",
    price: 2900,
    originalPrice: 3450,
    rating: 4.9,
    inStock: true,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=600&q=80",
    badge: "New",
    description: "Ideal for power sockets, air conditioners (up to 1.5 Ton), geysers, and heavy domestic appliances."
  },
  {
    id: "prod-3",
    name: "Double Pole MCB 32A C-Curve 10kA",
    category: "MCBs & DB Boxes",
    brand: "Schneider / L&T",
    spec: "32A, 240V/415V AC Double Pole",
    price: 640,
    originalPrice: 850,
    rating: 4.7,
    inStock: true,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    badge: "BestSeller",
    description: "Protection against overload and short circuit currents. Essential for domestic distribution boards and AC isolators."
  },
  {
    id: "prod-4",
    name: "Four Pole Isolator & RCCB 63A 30mA",
    category: "MCBs & DB Boxes",
    brand: "Legrand",
    spec: "63A 30mA 4-Pole Earth Leakage",
    price: 3250,
    originalPrice: 3900,
    rating: 5.0,
    inStock: true,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    badge: "Hot",
    description: "Complete electrocution and human safety protection device for whole apartment or commercial workshops."
  },
  {
    id: "prod-5",
    name: "Modular Switch 10A 1-Way (Pack of 10)",
    category: "Switches & Sockets",
    brand: "Anchor Roma / GM",
    spec: "10A 240V Glossy White Polycarbonate",
    price: 450,
    originalPrice: 600,
    rating: 4.6,
    inStock: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    badge: "Sale",
    description: "Smooth click mechanism, fire-resistant polycarbonate plate compatibility, silver-cadmium oxide contacts."
  },
  {
    id: "prod-6",
    name: "Commercial 16A Power Socket with Shutter",
    category: "Switches & Sockets",
    brand: "Anchor / Crabtree",
    spec: "16A 3-Pin Heavy Duty with Child Safety Shutter",
    price: 195,
    originalPrice: 240,
    rating: 4.8,
    inStock: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    badge: "New",
    description: "Required for refrigerators, microwave ovens, water heaters, and washing machines."
  },
  {
    id: "prod-7",
    name: "Industrial LED High Bay Flood Light 100W",
    category: "LED & Industrial Lights",
    brand: "Philips / Havells",
    spec: "100W IP65 Waterproof 6500K Cool White",
    price: 2450,
    originalPrice: 3200,
    rating: 4.9,
    inStock: true,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    badge: "BestSeller",
    description: "High lumen output with 4kV surge protection, robust pressure die-cast aluminium housing for warehouses and shops."
  },
  {
    id: "prod-8",
    name: "Digital Multimeter & Electrical Tool Kit",
    category: "Electrician Tools & Safety",
    brand: "Mastech / Stanley",
    spec: "True RMS Auto-ranging + Insulated Pliers & Testers",
    price: 1450,
    originalPrice: 1950,
    rating: 4.7,
    inStock: true,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80",
    badge: "-50%",
    description: "Includes digital multimeter, insulated 1000V screwdrivers, combination pliers, wire stripper, and digital neon tester."
  },
];

export function searchCatalog(query: string, limit = 5): Product[] {
  const clean = query.toLowerCase().trim();
  if (!clean) return PRODUCTS.slice(0, limit);

  const words = clean.split(/\W+/).filter((w) => w.length > 1);
  return PRODUCTS
    .map((p) => {
      const hay = `${p.name} ${p.category} ${p.brand} ${p.spec} ${p.description}`.toLowerCase();
      let score = 0;
      for (const w of words) {
        if (hay.includes(w)) score += 1;
      }
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}
