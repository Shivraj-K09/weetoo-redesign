import useSWR from "swr";
import { TradingOverview } from "./trading-overview";
import { Skeleton } from "@/components/ui/skeleton";

export function TradingOverviewContainer({ roomId }: { roomId: string }) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `/api/room/${roomId}/trader-pnl`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="flex h-full w-full">
        <div className="w-full p-2">
          <div className="text-center select-none">
            <span className="text-muted-foreground text-sm">Today Records</span>
            <div className="flex gap-4 mt-1 justify-center">
              <div className="flex items-center gap-2">
                <span className="text-sm">Buy</span>
                <Skeleton className="h-5 w-16 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sell</span>
                <Skeleton className="h-5 w-16 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="text-center select-none">
            <span className="text-muted-foreground text-sm">Total Records</span>
            <div className="flex gap-4 mt-1 justify-center">
              <div className="flex items-center gap-2">
                <span className="text-sm">Buy</span>
                <Skeleton className="h-5 w-16 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sell</span>
                <Skeleton className="h-5 w-16 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (error || !data)
    return (
      <div className="text-center text-red-500">Error loading P&amp;L</div>
    );

  return <TradingOverview stats={data} />;
}
