"use client";

import { DateRangePicker } from "@/components/date-range-picker";
import { StatCard } from "@/components/section-cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { DownloadIcon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DepositTable } from "./deposite-table";

export function DepositManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    paymentMethod: "all",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
    amountRange: "all",
  });

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { from: range?.from, to: range?.to },
    }));
  };

  const handleFilterChange = (
    key: Exclude<keyof typeof filters, "dateRange">,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      paymentMethod: "all",
      dateRange: {
        from: undefined,
        to: undefined,
      },
      amountRange: "all",
    });
  };

  // Count active filters
  const activeFilterCount = Object.values(filters).filter((value) => {
    if (typeof value === "object" && value !== null) {
      // Handle dateRange object
      return value.from || value.to;
    }
    return value !== "all";
  }).length;

  return (
    <div className="bg-background">
      <div className="space-y-6 mt-5 container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold">Deposite Management</h1>
            <p className="text-muted-foreground">
              View and manage KOR_Coin deposit transactions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Deposits"
            value="17,000"
            trend={{ value: 12.5, isPositive: true }}
            description="Trending up this month"
            subDescription="Total deposits increasing"
            color="blue"
          />

          <StatCard
            title="Approved Deposits"
            value="1,234"
            trend={{ value: 5.2, isPositive: true }}
            description="Deposits approved this month"
            subDescription="Stable approval rate"
            color="green"
          />

          <StatCard
            title="Rejected Deposits"
            value="1,234"
            trend={{ value: 5.2, isPositive: true }}
            description="Deposits rejected this month"
            subDescription="Stable rejection rate"
            color="red"
          />

          <StatCard
            title="Deposits Pending"
            value="1,234"
            trend={{ value: 5.2, isPositive: true }}
            description="Deposits pending this month"
            subDescription="Stable pending rate"
            color="yellow"
          />
        </div>

        <div className="flex items-center gap-3 w-full justify-between">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search deposits..."
              className="pl-9 shadow-none h-10  border border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <DateRangePicker
              date={filters.dateRange}
              onDateChange={handleDateRangeChange}
            />

            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="shadow-none h-10 cursor-pointer w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.paymentMethod}
              onValueChange={(value) =>
                handleFilterChange("paymentMethod", value)
              }
            >
              <SelectTrigger className="shadow-none h-10 cursor-pointer w-[200px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All methods</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.amountRange}
              onValueChange={(value) =>
                handleFilterChange("amountRange", value)
              }
            >
              <SelectTrigger className="shadow-none h-10 cursor-pointer w-[200px]">
                <SelectValue placeholder="Amount Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All amounts</SelectItem>
                <SelectItem value="0-100000">0 - 100,000 KOR</SelectItem>
                <SelectItem value="100000-500000">
                  100,000 - 500,000 KOR
                </SelectItem>
                <SelectItem value="500000-1000000">
                  500,000 - 1,000,000 KOR
                </SelectItem>
                <SelectItem value="1000000+">1,000,000+ KOR</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="default"
              onClick={clearFilters}
              disabled={activeFilterCount === 0}
              className="h-10 px-4 font-normal shadow-none cursor-pointer"
            >
              Clear Filters
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="shadow-none h-10 cursor-pointer"
            >
              <DownloadIcon className="h-4 w-4" />
              <span className="sr-only">Export</span>
            </Button>
          </div>
        </div>

        {/* Active filters display */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.status !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Status: {filters.status}
                <XIcon
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => handleFilterChange("status", "all")}
                />
              </Badge>
            )}
            {filters.paymentMethod !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Payment: {filters.paymentMethod}
                <XIcon
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => handleFilterChange("paymentMethod", "all")}
                />
              </Badge>
            )}
            {filters.amountRange !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Amount:{" "}
                {filters.amountRange.replace("-", " - ").replace("+", "+")}
                <XIcon
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => handleFilterChange("amountRange", "all")}
                />
              </Badge>
            )}
            {filters.dateRange.from && (
              <Badge variant="secondary" className="text-xs">
                From: {format(filters.dateRange.from, "PP")}
                <XIcon
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    handleDateRangeChange({
                      ...filters.dateRange,
                      from: undefined,
                    })
                  }
                />
              </Badge>
            )}
            {filters.dateRange.to && (
              <Badge variant="secondary" className="text-xs">
                To: {format(filters.dateRange.to, "PP")}
                <XIcon
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() =>
                    handleDateRangeChange({
                      ...filters.dateRange,
                      to: undefined,
                    })
                  }
                />
              </Badge>
            )}
          </div>
        )}

        <DepositTable searchTerm={searchTerm} filters={filters} />
      </div>
    </div>
  );
}
