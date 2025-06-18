"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, MoreHorizontal, Search } from "lucide-react";

interface InboxHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: "all" | "read" | "unread";
  onStatusChange: (status: "all" | "read" | "unread") => void;
}

export function InboxHeader({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}: InboxHeaderProps) {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1 gap-2">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <Filter className="h-4 w-4" />
                {selectedStatus === "all"
                  ? "All"
                  : selectedStatus === "unread"
                  ? "Unread"
                  : "Read"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusChange("all")}>
                All Messages
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange("unread")}>
                Unread
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange("read")}>
                Read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mark all as read</DropdownMenuItem>
              <DropdownMenuItem>Select all</DropdownMenuItem>
              <DropdownMenuItem>Refresh</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
