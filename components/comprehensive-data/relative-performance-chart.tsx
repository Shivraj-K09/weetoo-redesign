"use client";

import { useMemo, memo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PerformanceData {
  symbol: string;
  name: string;
  performance: number;
  type: "crypto" | "fiat";
}

// Static data to avoid recreation
const PERFORMANCE_DATA: PerformanceData[] = [
  { symbol: "ETH", name: "Ethereum", performance: 4.17, type: "crypto" },
  { symbol: "BTC", name: "Bitcoin", performance: 0.61, type: "crypto" },
  { symbol: "JPY", name: "Japanese Yen", performance: 0.37, type: "fiat" },
  { symbol: "DKK", name: "Danish Krone", performance: 0.23, type: "fiat" },
  { symbol: "INR", name: "Indian Rupee", performance: 0.15, type: "fiat" },
  { symbol: "CAD", name: "Canadian Dollar", performance: 0.14, type: "fiat" },
  { symbol: "CHF", name: "Swiss Franc", performance: 0.11, type: "fiat" },
  { symbol: "USD", name: "US Dollar", performance: 0.0, type: "fiat" },
  {
    symbol: "AUD",
    name: "Australian Dollar",
    performance: -0.52,
    type: "fiat",
  },
  {
    symbol: "NZD",
    name: "New Zealand Dollar",
    performance: -0.36,
    type: "fiat",
  },
  { symbol: "EUR", name: "Euro", performance: -0.23, type: "fiat" },
  { symbol: "GBP", name: "British Pound", performance: -0.21, type: "fiat" },
  { symbol: "TRY", name: "Turkish Lira", performance: -0.85, type: "fiat" },
  { symbol: "CNY", name: "Chinese Yuan", performance: -1.02, type: "fiat" },
];

// Memoized bar component
const PerformanceBar = memo(
  ({
    item,
    index,
    maxAbsValue,
  }: {
    item: PerformanceData;
    index: number;
    maxAbsValue: number;
  }) => {
    const isPositive = item.performance >= 0;
    const barHeight = useMemo(() => {
      const normalizedHeight = (Math.abs(item.performance) / maxAbsValue) * 100;
      return Math.max(4, normalizedHeight);
    }, [item.performance, maxAbsValue]);

    const formattedPercentage = useMemo(() => {
      const sign = item.performance > 0 ? "+" : "";
      return `${sign}${item.performance.toFixed(2)}%`;
    }, [item.performance]);

    return (
      <div className="flex flex-col items-center flex-1 group min-w-[60px]">
        {/* Performance value */}
        <div
          className={cn(
            "text-xs font-mono mb-2",
            isPositive
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          )}
        >
          {formattedPercentage}
        </div>

        {/* Bar */}
        <div className="relative w-full h-80 flex items-end">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${barHeight}%` }}
            transition={{ duration: 0.6, delay: index * 0.02 }}
            className={cn("w-full", isPositive ? "bg-green-500" : "bg-red-500")}
            style={{ minHeight: "2px" }}
          />
        </div>

        {/* Symbol */}
        <div className="mt-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">
          {item.symbol}
        </div>
      </div>
    );
  }
);
PerformanceBar.displayName = "PerformanceBar";

export const RelativePerformanceChart = memo(
  function RelativePerformanceChart() {
    const maxAbsValue = useMemo(() => {
      const values = PERFORMANCE_DATA.map((d) => Math.abs(d.performance));
      return Math.max(...values);
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full"
      >
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              24H Relative Performance vs USDT
            </h3>
          </div>

          {/* Chart */}
          <div className="p-6">
            <div className="flex items-end justify-between gap-2 h-96 overflow-x-auto pb-4">
              {PERFORMANCE_DATA.map((item, index) => (
                <PerformanceBar
                  key={item.symbol}
                  item={item}
                  index={index}
                  maxAbsValue={maxAbsValue}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
              <span>Best: ETH +4.17%</span>
              <span>Worst: CNY -1.02%</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);
