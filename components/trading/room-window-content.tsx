"use client";

import { TradingViewWidget } from "./trading-view-widget";
import { OrderBook } from "./order-book";
import { TradingForm } from "./trading-form";
import { ParticipantsList } from "./participants-list";
import { Chat } from "./chat";
import { TradeHistoryTabs } from "./trade-history-tabs";
import { Separator } from "../ui/separator";
import { MarketOverview } from "./market-overview";
import { TradingOverview } from "./trading-overview";

export default function RoomWindowContent() {
  return (
    <div className="h-[calc(100%-3rem)] bg-background flex flex-col gap-2 px-3 py-3">
      <div className="border h-[80px] w-full flex">
        <div className="w-full flex-[2]">
          <MarketOverview />
        </div>
        <Separator className="h-full" orientation="vertical" />
        <div className="w-full flex-1">
          <TradingOverview />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 h-full w-full">
        <div className="col-span-5  w-full h-full gap-5">
          <div className="flex flex-col gap-2 w-full h-full">
            <div className="flex w-full h-[550px] gap-2">
              <div className="flex-[3.5] border-border h-full w-full bg-background">
                <TradingViewWidget symbol="BTCUSDT" />
              </div>
              <div className="flex-1 border border-border h-full w-full bg-background p-2">
                <OrderBook />
              </div>
              <div className="flex-1 border border-border h-full w-full bg-background p-2">
                <TradingForm />
              </div>
            </div>
            <div className="flex flex-1 w-full gap-2 border">
              <TradeHistoryTabs />
            </div>
          </div>
        </div>
        <div className="col-span-1 w-full h-full">
          <div className="flex w-full h-full flex-col gap-2">
            <div className="w-full h-[300px] border border-border bg-background">
              <ParticipantsList />
            </div>
            <div className="w-full h-full border border-border bg-background">
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
