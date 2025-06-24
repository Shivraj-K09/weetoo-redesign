"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { TickerTape } from "react-ts-tradingview-widgets";

export default function TickerTapeWithTheme() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevent SSR mismatch

  const colorTheme = theme === "dark" ? "dark" : "light";

  return (
    <TickerTape
      symbols={[
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ]}
      showSymbolLogo={true}
      isTransparent={true}
      displayMode="compact"
      colorTheme="dark"
      locale="en"
    />
  );
}
