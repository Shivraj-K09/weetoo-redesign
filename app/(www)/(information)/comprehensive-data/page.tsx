import { Suspense, lazy } from "react";
import { InstrumentCard } from "@/components/comprehensive-data/instrument-card";
import {
  forexData,
  commoditiesData,
  type InstrumentData,
} from "@/components/comprehensive-data/market-data";
import { Metadata } from "next";

// Lazy load the chart component
const RelativePerformanceChart = lazy(() =>
  import("@/components/comprehensive-data/relative-performance-chart").then(
    (mod) => ({
      default: mod.RelativePerformanceChart,
    })
  )
);

export const metadata: Metadata = {
  title: "Comprehensive Data - Market Insights and Analytics",
  description:
    "Access real-time market data, charts, analytics, and trading indicators",
};

export default function ComprehensiveData() {
  const allInstruments = [...forexData, ...commoditiesData];

  return (
    <div className="container flex flex-col gap-10 mx-auto py-4 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {" "}
        {/* Updated grid columns and gap */}
        {allInstruments.map((instrument, index) => (
          <InstrumentCard
            key={instrument.id}
            instrument={instrument as InstrumentData}
            index={index}
          />
        ))}
      </div>
      <Suspense
        fallback={
          <div className="h-96 w-full bg-muted animate-pulse rounded-lg" />
        }
      >
        <RelativePerformanceChart />
      </Suspense>
    </div>
  );
}
