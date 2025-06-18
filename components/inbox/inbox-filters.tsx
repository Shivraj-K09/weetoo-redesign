"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { MessageCategory } from "./inbox-types";

interface InboxFiltersProps {
  selectedCategory: MessageCategory;
  selectedStatus: "all" | "read" | "unread";
  onCategoryChange: (category: MessageCategory) => void;
  onStatusChange: (status: "all" | "read" | "unread") => void;
}

const statusFilters = [
  { id: "all" as const, label: "All", count: 42 },
  { id: "unread" as const, label: "Unread", count: 12 },
  { id: "read" as const, label: "Read", count: 30 },
];

export function InboxFilters({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}: InboxFiltersProps) {
  return (
    <div className="border-b border-border bg-background/50">
      <div className="flex items-center gap-2 p-3">
        {/* Status Filters */}
        <div className="flex items-center gap-1">
          {statusFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedStatus === filter.id ? "default" : "ghost"}
              size="sm"
              className="h-8 px-3"
              onClick={() => onStatusChange(filter.id)}
            >
              {filter.label}
              <Badge
                variant={selectedStatus === filter.id ? "secondary" : "outline"}
                className="ml-2 h-5 w-5 p-0 text-xs"
              >
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="h-4 w-px bg-border mx-2" />

        {/* Category Display */}
        <div className="text-sm text-muted-foreground truncate max-w-[100px] sm:max-w-xs md:max-w-none ml-auto hidden xs:block">
          {selectedCategory === "all"
            ? "All Categories"
            : selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}
        </div>
      </div>
    </div>
  );
}
