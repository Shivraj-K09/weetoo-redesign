"use client";

import { BarChart3, Users, FileCheck, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ActivityLogStats() {
  const stats = [
    {
      label: "Total Activities",
      value: "142",
      change: "+12%",
      changeType: "positive" as const,
      icon: BarChart3,
      description: "Last 7 days",
      gradient:
        "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/50 dark:to-indigo-900/30",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Content Actions",
      value: "87",
      change: "61%",
      changeType: "neutral" as const,
      icon: FileCheck,
      description: "of total activities",
      gradient:
        "bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/50 dark:to-green-900/30",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "User Management",
      value: "38",
      change: "27%",
      changeType: "neutral" as const,
      icon: Users,
      description: "of total activities",
      gradient:
        "bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/50 dark:to-violet-900/30",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Security Actions",
      value: "17",
      change: "+8%",
      changeType: "positive" as const,
      icon: Shield,
      description: "Last 7 days",
      gradient:
        "bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/50 dark:to-amber-900/30",
      textColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className={`border-0 shadow-sm ${stat.gradient} relative overflow-hidden`}
          >
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <span
                      className={`text-xs font-medium ${
                        stat.changeType === "positive"
                          ? stat.textColor
                          : "text-muted-foreground"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-sm shadow-sm border border-white/20`}
                >
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
