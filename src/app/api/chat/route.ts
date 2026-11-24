import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { searchCatalog } from "@/lib/catalog";

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

    // Grounding with local shop catalog
    const matches = searchCatalog(last.content, 4);
    const shopItems = matches.length
      ? matches
          .map(
            (p) =>
              `- ${p.name} [Brand: ${p.brand}, Category: ${p.category}, Spec: ${p.spec}] Price: ₹${p.price}, Status: ${
                p.inStock ? "In Stock" : "Out of Stock"
              }`
          )
          .join("\n")
      : "No specific items matched this query directly from catalog.";

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    // Graceful fallback if no API key is configured yet
    if (!apiKey) {
      const lower = last.content.toLowerCase();
      let mockReply =
        "Welcome to Venus Electrical Trading Co! (Assistant running in preview mode - add GEMINI_API_KEY to activate full AI).\n\n";

      if (lower.includes("wire") || lower.includes("cable") || lower.includes("ac")) {
        mockReply +=
          "For typical residential installations:\n• 1.5 sq mm copper wire is commonly used for lighting and fan circuits.\n• 2.5 sq mm copper wire is recommended for 1.0 to 1.5 Ton AC units and geysers.\n• We carry Finolex & Polycab FR wires starting at ₹1,850/coil.\n\nPlease note: A licensed electrician must always confirm the wire load calculation for your actual installation!";
      } else if (lower.includes("mcb") || lower.includes("breaker")) {
        mockReply +=
          "We stock Schneider, Legrand & L&T MCBs. For domestic distribution:\n• Double Pole 32A MCB is available around ₹640.\n• 4-Pole RCCB 63A 30mA for shock protection is ₹3,250 in stock.";
      } else if (matches.length > 0) {
        mockReply += `We found matching items in our Chennai store:\n` +
          matches.map(m => `• ${m.name} (${m.spec}) - ₹${m.price}`).join("\n") +
          `\n\nVisit us at Thambu Chetty St, Chennai or click WhatsApp to order!`;
      } else {
        mockReply +=
          "We offer wires & cables (Finolex, Polycab), modular switches (Anchor, GM), MCBs (Schneider, Legrand), and industrial lighting. How can we assist your electrical requirements today?";
      }

      return Response.json({ reply: mockReply });
    }

    const ai = new GoogleGenAI({ apiKey });
    const contents = messages.map((m, i) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [
        {
          text:
            i === messages.length - 1
              ? `${m.content}\n\nShop items:\n${shopItems}`
              : m.content,
        },
      ],
    }));

    const result = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 400,
        temperature: 0.4,
      },
    });

    const reply = result.text?.trim();
    if (!reply) {
      throw new Error("Empty response received from Gemini");
    }

    return Response.json({ reply });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("Gemini Chat API Error:", errorMsg);
    return Response.json(
      {
        reply:
          "I couldn't reach the assistant right now. You can call us directly or visit our shop at Thambu Chetty St, Chennai.",
      },
      { status: 200 }
    );
  }
}
