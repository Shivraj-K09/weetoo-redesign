"use client";

import { CustomerSupportDialog } from "./user/customer-support-dialog";
import { KorCoinsRechargeDialog } from "./user/kor-coins-recharge-dialog";
import { WeetooMarketDialog } from "./user/weetoo-market-dialog";

export function UtilityBar() {
  return (
    <div
      className="w-full border-b border-border bg-muted/40 backdrop-blur-sm shadow-sm"
      style={{
        position: "relative",
        zIndex: 51,
      }}
    >
      <div
        className="flex justify-between items-center container mx-auto px-4"
        style={{ minHeight: 48 }}
      >
        {/* Left side - can be used for announcements, breadcrumbs, etc. */}
        <div className="flex items-center">
          {/* Placeholder for future content */}
        </div>

        {/* Right side - utility actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <WeetooMarketDialog />
          <KorCoinsRechargeDialog />
          <CustomerSupportDialog />
        </div>
      </div>
    </div>
  );
}
