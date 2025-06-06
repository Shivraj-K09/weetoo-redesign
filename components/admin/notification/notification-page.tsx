"use client";

import { Input } from "@/components/ui/input";
import { BellIcon } from "lucide-react";
import { NotificationTabs } from "./notification-tabs";
import { useState } from "react";

export function NotificationPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col gap-3 h-full ">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <BellIcon className="size-4" />
          <span className="text-sm font-medium">190 Notifications</span>
        </div>

        <div className="max-w-[300px] w-full">
          <Input
            placeholder="Search Notifications"
            className="w-full h-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border w-full h-full rounded-lg">
        <NotificationTabs searchTerm={searchTerm} />
      </div>
    </div>
  );
}
