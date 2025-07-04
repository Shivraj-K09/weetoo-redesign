import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbols = searchParams.get("symbols");
  if (!symbols) {
    return NextResponse.json(
      { error: "Missing symbols parameter" },
      { status: 400 }
    );
  }
  const symbolList = symbols.split(",");

  // Fetch all tickers and klines in parallel
  const results = await Promise.all(
    symbolList.map(async (symbol) => {
      const [tickerRes, klinesRes] = await Promise.all([
        fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`),
        fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`
        ),
      ]);
      const ticker = await tickerRes.json();
      const klines = await klinesRes.json();
      return { symbol, ticker, klines };
    })
  );

  return NextResponse.json({ data: results });
}
