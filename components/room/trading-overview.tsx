interface TradingStatsSection {
  buy: number;
  sell: number;
}

interface TradingStats {
  today?: TradingStatsSection;
  total?: TradingStatsSection;
}

export function TradingOverview({ stats }: { stats?: TradingStats }) {
  // Calculate percentages
  const todayBuy = stats?.today?.buy ?? 0;
  const todaySell = stats?.today?.sell ?? 0;
  const todayTotal = todayBuy + todaySell;
  const todayBuyPct = todayTotal ? (todayBuy / todayTotal) * 100 : 0;
  const todaySellPct = todayTotal ? (todaySell / todayTotal) * 100 : 0;

  const totalBuy = stats?.total?.buy ?? 0;
  const totalSell = stats?.total?.sell ?? 0;
  const totalTotal = totalBuy + totalSell;
  const totalBuyPct = totalTotal ? (totalBuy / totalTotal) * 100 : 0;
  const totalSellPct = totalTotal ? (totalSell / totalTotal) * 100 : 0;

  return (
    <div className="flex h-full w-full">
      <div className="w-full p-2">
        <div className="text-center select-none">
          <span className="text-muted-foreground text-sm">Today Records</span>
          <div className="flex gap-4 mt-1 justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm">Buy</span>
              <span className="text-green-500 text-sm">
                ↑ {todayBuyPct.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sell</span>
              <span className="text-red-500 text-sm">
                ↓ {todaySellPct.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-2">
        <div className="text-center select-none">
          <span className=" text-muted-foreground text-sm">Total Records</span>
          <div className="flex gap-4 mt-1 justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm">Buy</span>
              <span className="text-green-500 text-sm">
                ↑ {totalBuyPct.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sell</span>
              <span className="text-red-500 text-sm">
                ↓ {totalSellPct.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
