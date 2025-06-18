export function TradingOverview() {
  return (
    <div className="flex h-full w-full">
      <div className="w-full p-2">
        <div className="text-center">
          <span className="text-muted-foreground text-sm">Today Records</span>

          <div className="flex gap-4 mt-1 justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm">Buy</span>
              <span className="text-green-500 text-sm">↑ 0.00%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sell</span>
              <span className="text-red-500 text-sm">↓ 0.54%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-2">
        <div className="text-center">
          <span className=" text-muted-foreground text-sm">Total Records</span>
          <div className="flex gap-4 mt-1 justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm">Buy</span>
              <span className="text-green-500 text-sm">↑ 0.00%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sell</span>
              <span className="text-red-500 text-sm">↓ 0.54%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
