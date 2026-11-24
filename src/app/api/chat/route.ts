import { searchCatalog, PRODUCTS } from "@/lib/catalog";

type Msg = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;

export async function POST(request: Request) {
  try {
    let body: { messages?: Msg[] };
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const rawMessages = body.messages ?? [];
    const messages = rawMessages
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-MAX_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

    const last = messages[messages.length - 1];
    if (!last || last.role !== "user") {
      return Response.json({ error: "No user question provided" }, { status: 400 });
    }

    const q = last.content.toLowerCase().trim();

    // 0. Explicit Error / Unrecognized query simulation option
    if (
      q.includes("error") ||
      q.includes("trouble") ||
      q.includes("test error") ||
      q.includes("fail") ||
      q.includes("complain")
    ) {
      return Response.json({
        reply: `⚠️ [Notice / Error Response]:\nWe are currently unable to process this request or find the requested service item. Please contact our technical desk directly:\n\n• Phone / WhatsApp: +91 98400 00000\n• Shop Counter: New No.305, Thambu Chetty St, Chennai\n• Timings: Mon-Sat 9:30 AM - 8:00 PM\n\nOur team will assist with custom quotes, stock verification, or order issues.`,
      });
    }

    // 1. MCBs & Circuit Breakers / DB Boxes
    if (q.includes("mcb") || q.includes("breaker") || q.includes("rccb") || q.includes("isolator") || q.includes("distribution")) {
      const items = PRODUCTS.filter((p) => p.category.includes("MCB"));
      const itemList = items
        .map((p) => `• ${p.name} (${p.brand}, ${p.spec}) - ₹${p.price} [${p.inStock ? "In Stock" : "Out of Stock"}]`)
        .join("\n");

      return Response.json({
        reply: `Here is our current MCB & Switchgear availability and pricing:\n\n${itemList}\n\nAll items are tested to ISI standards. For domestic wiring, a licensed electrician should verify your trip curves (B, C or D). You can add items to your cart or order via WhatsApp!`,
      });
    }

    // 2. Electrical Switches & Sockets
    if (q.includes("switch") || q.includes("socket") || q.includes("modular") || q.includes("board")) {
      const items = PRODUCTS.filter((p) => p.category.includes("Switches"));
      const itemList = items
        .map((p) => `• ${p.name} (${p.brand}, ${p.spec}) - ₹${p.price} [${p.inStock ? "In Stock" : "Out of Stock"}]`)
        .join("\n");

      return Response.json({
        reply: `Here are our modular switches & power sockets in stock:\n\n${itemList}\n\nWe provide genuine Anchor Roma, GM, and Crabtree modular accessories in gloss white finish with fire-retardant polycarbonate plates.`,
      });
    }

    // 3. PCBs / Electronic Circuit Boards & Custom Components
    if (q.includes("pcb") || q.includes("circuit board") || q.includes("electronic")) {
      return Response.json({
        reply: `For specialized electronic PCBs, relays, and motor starter control boards:\n\n• Standard single-phase & 3-phase submersible pump starter control boards are available in stock (₹850 - ₹1,800 depending on HP rating).\n• For custom electronic PCBs or specific industrial relay boards, please contact our trade counter directly with your component specifications at +91 98400 00000 or visit our Chennai shop!`,
      });
    }

    // 4. Wires, Cables & AC load sizing
    if (q.includes("wire") || q.includes("cable") || q.includes("copper") || q.includes("ac") || q.includes("gauge") || q.includes("sq mm")) {
      const items = PRODUCTS.filter((p) => p.category.includes("Wires"));
      const itemList = items
        .map((p) => `• ${p.name} (${p.brand}, ${p.spec}) - ₹${p.price} [${p.inStock ? "In Stock" : "Out of Stock"}]`)
        .join("\n");

      return Response.json({
        reply: `Here are our certified copper wiring cables in stock:\n\n${itemList}\n\nGeneral Rule of Thumb:\n• 1.5 sq mm: Standard lighting and ceiling fan circuits.\n• 2.5 sq mm: 1.0 to 1.5 Ton ACs, geysers, and kitchen power points.\n• 4.0 sq mm: 2.0 Ton ACs and heavy domestic loads.\n(Please have a licensed electrician verify final load requirements).`,
      });
    }

    // 5. Lights / Industrial Lighting
    if (q.includes("light") || q.includes("led") || q.includes("bay") || q.includes("flood")) {
      const items = PRODUCTS.filter((p) => p.category.includes("Light"));
      const itemList = items
        .map((p) => `• ${p.name} (${p.brand}, ${p.spec}) - ₹${p.price} [${p.inStock ? "In Stock" : "Out of Stock"}]`)
        .join("\n");

      return Response.json({
        reply: `Here is our LED and industrial lighting stock:\n\n${itemList}\n\nAll lights include surge protection and pressure die-cast aluminium housing for warehouses, offices, and homes.`,
      });
    }

    // 6. General Catalog Keyword Search Fallback
    const matches = searchCatalog(last.content, 3);
    if (matches.length > 0) {
      const matchedList = matches
        .map((p) => `• ${p.name} (${p.brand}, ${p.spec}) - ₹${p.price} [${p.inStock ? "In Stock" : "Out of Stock"}]`)
        .join("\n");

      return Response.json({
        reply: `Here are matching products available in our shop:\n\n${matchedList}\n\nVisit us at New No.305, Thambu Chetty St, Chennai, or use the "Add to Cart" button to create a WhatsApp quote!`,
      });
    }

    // Default friendly response
    return Response.json({
      reply: `Welcome to Venus Electrical Trading Co! We stock:\n• Certified FR Wires & Cables (Finolex, Polycab)\n• MCBs, DB Boxes & RCCBs (Schneider, Legrand)\n• Modular Switches & Power Sockets (Anchor, GM)\n• Industrial LED Lighting & Tools\n\nAsk about any category (e.g. "I need MCBs", "I need electrical switches", "I need wire for AC") for instant pricing and availability!`,
    });
  } catch (err: unknown) {
    console.error("Local Chat Handler Error:", err);
    return Response.json(
      {
        reply: "Welcome to Venus Electrical! Please check our product catalog above or call our Chennai shop at +91 98400 00000 for pricing and availability.",
      },
      { status: 200 }
    );
  }
}
