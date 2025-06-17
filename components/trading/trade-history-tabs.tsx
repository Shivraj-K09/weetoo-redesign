"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Info } from "lucide-react";

interface Position {
  symbol: string;
  side: string;
  quantity: string;
  size: string;
  entry: string;
  initialMargin: string;
  pnl: string;
}

interface TradeHistoryItem {
  symbol: string;
  side: string;
  size: string;
  entry: string;
  exit: string;
  pnl: string;
}

const positions: Position[] = [
  {
    symbol: "BTCUSDT",
    side: "Long",
    quantity: "0.0979700 BTC",
    size: "$9999.68",
    entry: "$108,932.54",
    initialMargin: "$9999.68",
    pnl: "$188.83 (-1.89%)",
  },
];

const tradeHistory: TradeHistoryItem[] = [
  {
    symbol: "BTCUSDT",
    side: "Long",
    size: "$10979.17",
    entry: "$109,79.72",
    exit: "$109,759.42",
    pnl: "$3.23 (-0.03%)",
  },
];

export function TradeHistoryTabs() {
  return (
    <Tabs defaultValue="positions" className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center px-4 py-2 border-b border-border">
        <TabsList className="grid w-fit grid-cols-2 h-auto p-0 bg-transparent rounded-none">
          <TabsTrigger
            value="positions"
            className="relative data-[state=active]:text-red-500 data-[state=inactive]:text-gray-400 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent text-xs font-medium transition-all duration-200 px-2 py-2 border-b-2 border-transparent data-[state=active]:border-red-500 rounded-none shadow-none"
          >
            Positions
          </TabsTrigger>
          <TabsTrigger
            value="trade-history"
            className="relative data-[state=active]:text-red-500 data-[state=inactive]:text-gray-400 data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent text-xs font-medium transition-all duration-200 px-2 py-2 border-b-2 border-transparent data-[state=active]:border-red-500 rounded-none shadow-none"
          >
            Trade History
          </TabsTrigger>
        </TabsList>
        <Button variant="destructive" className="px-3 py-1 text-xs rounded-sm">
          Close All Positions
        </Button>
      </div>
      <TabsContent
        value="positions"
        className="h-[calc(100%-4rem)] overflow-y-auto overflow-x-auto mt-0 bg-background"
      >
        <Table className="w-full">
          <TableHeader className="bg-[--table-header-background]">
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Symbol
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Side
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Quantity
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Size
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Entry <Info className="h-3 w-3 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Initial Margin
                  <Info className="h-3 w-3 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                <div className="flex items-center gap-1">
                  PNL <Info className="h-3 w-3 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position, index) => (
              <TableRow
                key={index}
                className="hover:bg-muted border-0 !border-b-0"
              >
                <TableCell className="text-foreground text-xs p-2 text-left">
                  {position.symbol}
                </TableCell>
                <TableCell
                  className={`text-xs p-2 text-left ${
                    position.side === "Long" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {position.side}
                </TableCell>
                <TableCell className="text-foreground text-xs p-2 text-left">
                  {position.quantity}
                </TableCell>
                <TableCell className="text-foreground text-xs p-2 text-left">
                  {position.size}
                </TableCell>
                <TableCell className="text-foreground text-xs p-2 text-left">
                  {position.entry}
                </TableCell>
                <TableCell className="text-foreground text-xs p-2 text-left">
                  {position.initialMargin}
                </TableCell>
                <TableCell
                  className={`text-xs p-2 text-left ${
                    position.pnl.includes("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {position.pnl}
                </TableCell>
                <TableCell className="p-2 text-left">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="px-3 py-1 text-xs h-auto rounded-sm"
                  >
                    Close
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent
        value="trade-history"
        className="h-[calc(100%-4rem)] overflow-y-auto overflow-x-auto mt-0 bg-background"
      >
        <Table className="w-full">
          <TableHeader className="bg-[--table-header-background]">
            <TableRow className="border-b border-border">
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Symbol
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Side
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Size
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Entry
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                Exit
              </TableHead>
              <TableHead className="text-muted-foreground font-bold text-xs p-2 text-left whitespace-nowrap">
                PNL
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tradeHistory.map((item, index) => (
              <TableRow
                key={index}
                className="hover:bg-muted border-0 !border-b-0"
              >
                <TableCell className="text-foreground text-xs p-2 text-left">
                  {item.symbol}
                </TableCell>
                <TableCell
                  className={`text-xs p-2 text-left ${
                    item.side === "Long" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.side}
                </TableCell>
                <TableCell className="text-foreground text-xs p-2 text-left">
                  {item.size}
                </TableCell>
                <TableCell className="text-foreground text-xs p-2 text-left">
                  {item.entry}
                </TableCell>
                <TableCell className="text-foreground text-xs p-2 text-left">
                  {item.exit}
                </TableCell>
                <TableCell
                  className={`text-xs p-2 text-left ${
                    item.pnl.includes("-") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.pnl}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
