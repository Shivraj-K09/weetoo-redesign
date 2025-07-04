import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json(
      { error: "Missing symbol parameter" },
      { status: 400 }
    );
  }

  try {
    // Fetch ticker and klines in parallel
    const [tickerRes, klinesRes] = await Promise.all([
      fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`),
      fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`
      ),
    ]);
    if (!tickerRes.ok || !klinesRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Binance" },
        { status: 502 }
      );
    }
    const ticker = await tickerRes.json();
    const klines = await klinesRes.json();
    return NextResponse.json({ ticker, klines });
  } catch (_) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
