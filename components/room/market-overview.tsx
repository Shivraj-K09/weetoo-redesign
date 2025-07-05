"use client";

import { Info } from "lucide-react";

export function MarketOverview() {
  return (
    <div className="flex items-center justify-between w-full h-full p-4 text-sm">
      <div className="flex items-center gap-2 h-full">
        <div className="flex flex-col items-start px-2">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-zinc-800 p-1 rounded-md">
            <p className="text-sm font-semibold">BTCUSDT</p>
          </div>
          <p className="text-muted-foreground text-xs whitespace-nowrap">
            USDT Futures Trading
          </p>
        </div>
        <div className="h-full w-[1px] bg-border mx-2"></div>
        <div className="flex flex-col items-start justify-center h-full px-2">
          <p className="text-green-500 text-base font-semibold">105730.22</p>
          <p className="text-muted-foreground text-xs">$105730.22</p>
        </div>
      </div>
      <div className="flex items-center gap-4 h-full">
        <div className="flex flex-col items-center justify-center px-2 min-w-[100px]">
          <p className="text-muted-foreground text-xs">변동률(24H)</p>
          <p className="text-red-500 font-semibold">-1048.29(-0.98%)</p>
        </div>
        <div className="flex flex-col items-center justify-center px-2 min-w-[100px]">
          <p className="text-muted-foreground text-xs">최고가(24H)</p>
          <p className="text-foreground font-semibold">108952.38</p>
        </div>
        <div className="flex flex-col items-center justify-center px-2 min-w-[100px]">
          <p className="text-muted-foreground text-xs">최저가(24H)</p>
          <p className="text-foreground font-semibold">105704.32</p>
        </div>
        <div className="flex flex-col items-center justify-center px-2 min-w-[150px]">
          <p className="text-muted-foreground text-xs">턴오버(24H/USDT)</p>
          <p className="text-foreground font-semibold">1,651,451,899.45</p>
        </div>
        <div className="flex flex-col items-center justify-center px-2 min-w-[150px]">
          <p className="text-muted-foreground text-xs">거래량(24H/BTC)</p>
          <p className="text-foreground font-semibold">15,390.76</p>
        </div>
        <div className="flex flex-col items-center justify-center px-2 min-w-[150px]">
          <p className="text-muted-foreground text-xs">미결제약정(24H/BTC)</p>
          <p className="text-foreground font-semibold">77,214.61</p>
        </div>
        <div className="flex flex-col items-center justify-center px-2 min-w-[150px]">
          <p className="text-muted-foreground text-xs">펀딩율 / 남은시간</p>
          <div className="flex items-center gap-2">
            <p className="text-red-500 font-semibold">+0.0100%</p>
            <p className="text-foreground font-semibold">04:46:21</p>
            <Info size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
