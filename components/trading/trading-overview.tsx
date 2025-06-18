import { Separator } from "../ui/separator";

export function TradingOverview() {
  return (
    <div className="flex flex-col h-full w-full p-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex-1 text-center">
          <p className="text-sm text-muted-foreground">Today Records</p>
          <div className="flex justify-center gap-4 mt-1">
            <p className="text-blue-500 font-semibold">
              BUY <span className="text-green-500">↑ 0.00%</span>
            </p>
            <p className="text-red-500 font-semibold">
              SELL <span className="text-green-500">↑ 0.00%</span>
            </p>
          </div>
        </div>
        <Separator orientation="vertical" className="h-12 mx-2" />
        <div className="flex-1 text-center">
          <p className="text-sm text-muted-foreground">Total Records</p>
          <div className="flex justify-center gap-4 mt-1">
            <p className="text-blue-500 font-semibold">
              BUY <span className="text-red-500">↓ 0.54%</span>
            </p>
            <p className="text-red-500 font-semibold">
              SELL <span className="text-green-500">↑ 0.00%</span>
            </p>
          </div>
        </div>
      </div>
      <Separator className="w-full my-2" />
      <div className="flex items-center justify-between mt-2 px-4">
        <p className="text-sm text-muted-foreground">Cumulative Profit Rate:</p>
        <p className="text-lg font-bold text-gray-400">
          0.00% <span className="text-sm text-muted-foreground">(4 rooms)</span>
        </p>
      </div>
    </div>
  );
}
