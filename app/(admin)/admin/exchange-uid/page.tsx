import { ExchangeUIDPage } from "@/components/admin/exchange-uid/exchange-uid-page";
import { StatCard } from "@/components/section-cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Exchange UID | Weetoo",
  description: "Manage user IDs and permissions in the Weetoo admin panel.",
};

export default function ExchangeUID() {
  return (
    <div className="container mx-auto space-y-5">
      <div className="flex items-center justify-between pb-6 border-b border-border mt-5">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">Exchange UID</h1>
          <p className="text-muted-foreground">
            View and manage exchange user identification numbers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <StatCard
          title="Total UIDs"
          value="10,000"
          trend={{ value: 8.3, isPositive: true }}
          description="Total UIDs in the system"
          subDescription="Overall user identification numbers"
          color="purple"
        />

        <StatCard
          title="New UIDs"
          value="1,234"
          trend={{ value: 12.5, isPositive: true }}
          description="New UIDs created"
          subDescription="Total new UIDs created"
          color="blue"
        />

        <StatCard
          title="Verified UIDs"
          value="5,678"
          trend={{ value: 5.2, isPositive: true }}
          description="Verified UIDs"
          subDescription="Total verified UIDs"
          color="green"
        />
      </div>

      <ExchangeUIDPage />
    </div>
  );
}
