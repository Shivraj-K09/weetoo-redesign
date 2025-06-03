"use client";

import { motion } from "motion/react";
import {
  Landmark,
  Coins,
  Droplets,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { cn } from "@/lib/utils";
import type { InstrumentData } from "./market-data";
import { useMemo, memo } from "react";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface InstrumentCardProps {
  instrument: InstrumentData;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.07,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Static chart data to avoid regeneration
const STATIC_CHART_DATA = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "Jun", desktop: 214 },
];

// Static chart config
const CHART_CONFIG = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// Memoized icon component
const InstrumentIcon = memo(
  ({ type, name }: { type: string; name: string }) => {
    const iconClasses = "w-4 h-4 text-slate-600 dark:text-slate-400";

    switch (type) {
      case "forex":
        return <Landmark className={iconClasses} />;
      case "commodity":
        if (name.toLowerCase().includes("gold")) {
          return <Coins className={iconClasses} />;
        }
        if (name.toLowerCase().includes("oil")) {
          return <Droplets className={iconClasses} />;
        }
        return <Coins className={iconClasses} />;
      default:
        return null;
    }
  }
);
InstrumentIcon.displayName = "InstrumentIcon";

// Memoized chart component
const MiniChart = memo(() => (
  <div className="h-16 -mx-1">
    <ChartContainer config={CHART_CONFIG} className="w-full h-full">
      <LineChart
        accessibilityLayer
        data={STATIC_CHART_DATA}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="desktop"
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  </div>
));
MiniChart.displayName = "MiniChart";

export const InstrumentCard = memo(function InstrumentCard({
  instrument,
  index,
}: InstrumentCardProps) {
  const isPositiveChange = instrument.changePercent >= 0;

  // Memoize price formatting
  const formattedPrice = useMemo(
    () => instrument.price.toFixed(instrument.type === "forex" ? 4 : 2),
    [instrument.price, instrument.type]
  );

  const formattedChangeValue = useMemo(
    () => instrument.changeValue.toFixed(instrument.type === "forex" ? 4 : 2),
    [instrument.changeValue, instrument.type]
  );

  const formattedHigh = useMemo(
    () => instrument.high24h.toFixed(instrument.type === "forex" ? 4 : 2),
    [instrument.high24h, instrument.type]
  );

  const formattedLow = useMemo(
    () => instrument.low24h.toFixed(instrument.type === "forex" ? 4 : 2),
    [instrument.low24h, instrument.type]
  );

  // Memoize style calculations
  const cardStyle = useMemo(
    () => ({
      boxShadow: isPositiveChange
        ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(34, 197, 94, 0.1)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(239, 68, 68, 0.1)",
    }),
    [isPositiveChange]
  );

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          "bg-background",
          "border-2 transition-all duration-300",
          isPositiveChange
            ? "border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-green-100/50 dark:hover:shadow-green-900/20"
            : "border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 hover:shadow-red-100/50 dark:hover:shadow-red-900/20",
          "shadow-lg hover:shadow-xl",
          "hover:scale-[1.02] hover:-translate-y-1"
        )}
        style={cardStyle}
      >
        {/* Subtle top accent */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1",
            isPositiveChange
              ? "bg-gradient-to-r from-green-400 to-green-500"
              : "bg-gradient-to-r from-red-400 to-red-500"
          )}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <InstrumentIcon type={instrument.type} name={instrument.name} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {instrument.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {instrument.symbol}
                </p>
              </div>
            </div>

            <div
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5",
                isPositiveChange
                  ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                  : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
              )}
            >
              {isPositiveChange ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {isPositiveChange ? "+" : ""}
              {instrument.changePercent.toFixed(2)}%
            </div>
          </div>

          {/* Price */}
          <div className="mb-5">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {formattedPrice}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                USD
              </span>
            </div>
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isPositiveChange
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              )}
            >
              {isPositiveChange ? "+" : ""}
              {formattedChangeValue}
              <span className="text-xs text-slate-400 ml-1">24h</span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mb-5">
            <MiniChart />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                24H High
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {formattedHigh}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                24H Low
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {formattedLow}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
