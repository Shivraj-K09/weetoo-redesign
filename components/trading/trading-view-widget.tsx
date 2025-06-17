"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: {
      widget: new (config: {
        container_id: string;
        symbol: string;
        interval: string;
        timezone: string;
        theme: string;
        style: string;
        locale: string;
        backgroundColor: string;
        hide_top_toolbar: boolean;
        save_image: boolean;
        height: string;
        width: string;
        support_host: string;
      }) => void;
    };
  }
}

interface TradingViewWidgetProps {
  symbol: string;
}

export function TradingViewWidget({ symbol }: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window.TradingView !== "undefined" && container.current) {
        new window.TradingView.widget({
          container_id: container.current.id,
          symbol: symbol,
          interval: "D",
          timezone: "Asia/Seoul",
          theme: "dark",
          style: "1",
          locale: "kr",
          backgroundColor: "rgba(0, 0, 0, 1)",
          hide_top_toolbar: true,
          save_image: false,
          height: "100%",
          width: "100%",
          support_host: "https://www.tradingview.com",
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [symbol]);

  return (
    <div
      id={`tradingview_${symbol}`}
      ref={container}
      className="w-full h-full"
    />
  );
}
