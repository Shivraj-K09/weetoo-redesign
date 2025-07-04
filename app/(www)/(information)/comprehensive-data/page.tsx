import CryptoDashboardClient from "@/components/comprehensive-data/CryptoDashboardClient";
import { Metadata } from "next";
import { lazy } from "react";

// Lazy load the chart component
// const RelativePerformanceChart = lazy(() =>
//   import("@/components/comprehensive-data/relative-performance-chart").then(
//     (mod) => ({
//       default: mod.RelativePerformanceChart,
//     })
//   )
// );

export const metadata: Metadata = {
  title: "Comprehensive Data - Market Insights and Analytics",
  description:
    "Access real-time market data, charts, analytics, and trading indicators",
};

export default function ComprehensiveData() {
  return (
    <div className="container flex flex-col gap-10 mx-auto py-4 pb-10 px-4">
      <CryptoDashboardClient />
      {/* <Suspense fallback={<div className="h-96 w-full bg-muted rounded-lg" />}>
        <RelativePerformanceChart />
      </Suspense> */}
    </div>
  );
}
