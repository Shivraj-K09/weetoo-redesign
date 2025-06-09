"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon, SearchIcon } from "lucide-react";
import { ActivityLogStats } from "./activity-log-stats";
import { ActivityLogFilters } from "./activity-log-filters";
import { ActivityLogTable } from "./activity-log-table";
import { useState } from "react";

export function ActivityLogMain() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
    selectedAdmins: [] as string[],
    selectedActions: [] as string[],
  });
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Activity Log
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track and monitor all administrative actions across the platform
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <ActivityLogStats />

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <ActivityLogFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Activity Table */}
      <ActivityLogTable searchQuery={searchQuery} filters={filters} />
    </>
  );
}
