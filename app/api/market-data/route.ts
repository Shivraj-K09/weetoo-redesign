import { NextRequest, NextResponse } from "next/server";

interface MarketDataResponse {
  orderBook?: unknown;
  orderBookError?: string;
  trades?: unknown;
  tradesError?: string;
  ticker?: {
    lastPrice: string;
    priceChange: string;
    priceChangePercent: string;
    highPrice: string;
    lowPrice: string;
    quoteVolume: string;
    volume: string;
  };
  tickerError?: string;
  openInterest?: string;
  openInterestError?: string;
  lastFundingRate?: string;
  nextFundingTime?: number;
  fundingError?: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  const include = searchParams.get("include") || "all"; // "orderbook", "trades", "ticker", "openInterest", or "all"

  if (!symbol) {
    return NextResponse.json(
      { error: "Missing symbol parameter" },
      { status: 400 }
    );
  }

  let orderBook, trades, ticker, openInterest, fundingRate, nextFundingTime;
  const responses: MarketDataResponse = {};
  const fetches = [];

  if (include === "orderbook" || include === "all") {
    fetches.push(
      fetch(`https://api.binance.us/api/v3/depth?symbol=${symbol}&limit=6`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch order book");
          orderBook = await res.json();
          responses.orderBook = orderBook;
        })
        .catch((err) => {
          responses.orderBookError = err.message;
        })
    );
  }

  if (include === "trades" || include === "all") {
    fetches.push(
      fetch(`https://api.binance.us/api/v3/trades?symbol=${symbol}&limit=30`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch trades");
          trades = await res.json();
          responses.trades = trades;
        })
        .catch((err) => {
          responses.tradesError = err.message;
        })
    );
  }

  if (include === "ticker" || include === "all") {
    fetches.push(
      fetch(`https://api.binance.us/api/v3/ticker/24hr?symbol=${symbol}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch ticker");
          const t = await res.json();
          ticker = {
            lastPrice: t.lastPrice,
            priceChange: t.priceChange,
            priceChangePercent: t.priceChangePercent,
            highPrice: t.highPrice,
            lowPrice: t.lowPrice,
            quoteVolume: t.quoteVolume,
            volume: t.volume,
          };
          responses.ticker = ticker;
        })
        .catch((err) => {
          responses.tickerError = err.message;
        })
    );
  }

  if (include === "openInterest" || include === "all") {
    fetches.push(
      fetch(`https://fapi.binance.us/fapi/v1/openInterest?symbol=${symbol}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch open interest");
          const oi = await res.json();
          openInterest = oi.openInterest;
          responses.openInterest = openInterest;
        })
        .catch((err) => {
          responses.openInterestError = err.message;
        })
    );
  }

  if (include === "all" || include === "funding") {
    fetches.push(
      fetch(`https://fapi.binance.us/fapi/v1/premiumIndex?symbol=${symbol}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to fetch funding rate");
          const premium = await res.json();
          fundingRate = premium.lastFundingRate;
          nextFundingTime = premium.nextFundingTime;
          responses.lastFundingRate = fundingRate;
          responses.nextFundingTime = nextFundingTime;
        })
        .catch((err) => {
          responses.fundingError = err.message;
        })
    );
  }

  await Promise.all(fetches);
  return NextResponse.json(responses);
}
