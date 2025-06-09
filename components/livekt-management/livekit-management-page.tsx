"use client";

import { useState } from "react";
import { Users, Mic, DollarSign } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

// Components
import { MetricCard } from "./metric-card";
import { UsagePatternChart } from "./usage-pattern-chart";
import { DayOfWeekChart } from "./day-of-week-chart";
import { TopUsersTable } from "./top-users-table";
import { TopRoomsTable } from "./top-rooms-table";
import { DateRangePicker } from "./date-range-picker";

// Data
import {
  metrics,
  usagePatternData,
  dayOfWeekData,
  topUsers,
  topRooms,
} from "./mock-data";

export function LiveKitManagementPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 1), // June 1, 2025
    to: addDays(new Date(2025, 5, 1), 29), // June 30, 2025
  });
  const [isKRW, setIsKRW] = useState(false);

  const metricCards = [
    {
      title: "Broadcasting Time",
      icon: Mic,
      data: metrics.broadcastingTime,
      description: "Higher rate than listening time",
      colorScheme: {
        gradient:
          "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
        border: "border-orange-100 dark:border-orange-900/30",
        icon: "text-orange-600 dark:text-orange-400",
        badge:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
        decorative:
          "bg-gradient-to-br from-orange-200/30 to-red-200/30 dark:from-orange-800/30 dark:to-red-800/30",
      },
    },
    {
      title: "Listening Time",
      icon: Users,
      data: metrics.listeningTime,
      description: "Based on LiveKit pricing",
      colorScheme: {
        gradient:
          "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
        border: "border-blue-100 dark:border-blue-900/30",
        icon: "text-blue-600 dark:text-blue-400",
        badge:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
        decorative:
          "bg-gradient-to-br from-blue-200/30 to-indigo-200/30 dark:from-blue-800/30 dark:to-indigo-800/30",
      },
    },
    {
      title: "Total Cost",
      icon: DollarSign,
      data: metrics.totalCost,
      description: "This month's usage statistics",
      colorScheme: {
        gradient:
          "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
        border: "border-emerald-100 dark:border-emerald-900/30",
        icon: "text-emerald-600 dark:text-emerald-400",
        badge:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
        decorative:
          "bg-gradient-to-br from-emerald-200/30 to-teal-200/30 dark:from-emerald-800/30 dark:to-teal-800/30",
      },
    },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold">LiveKit Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage your LiveKit usage
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Currency Toggle - FIXED LOGIC */}
            <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg border border-border">
              <span className="text-sm font-medium">
                {isKRW ? "KRW (₩)" : "USD ($)"}
              </span>
              <Switch
                checked={isKRW}
                onCheckedChange={setIsKRW}
                className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary"
              />
            </div>

            {/* Date Range Picker */}
            <DateRangePicker date={date} setDate={setDate} />
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metricCards.map((card, index) => (
            <MetricCard
              key={index}
              title={card.title}
              icon={card.icon}
              data={card.data}
              description={card.description}
              colorScheme={card.colorScheme}
              isKRW={isKRW}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UsagePatternChart data={usagePatternData} />
          <DayOfWeekChart data={dayOfWeekData} />
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopUsersTable users={topUsers} isKRW={isKRW} />
          <TopRoomsTable rooms={topRooms} isKRW={isKRW} />
        </div>
      </div>
    </div>
  );
}
