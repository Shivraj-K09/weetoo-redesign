"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  FileText,
  Inbox,
  Plus,
  Send,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import type { MessageCategory } from "./inbox-types";

interface InboxSidebarProps {
  selectedCategory: MessageCategory;
  onCategoryChange: (category: MessageCategory) => void;
  onComposeClick?: () => void;
}

const categories = [
  { id: "inbox" as const, label: "Inbox", icon: Inbox, count: 12, unread: 3 },
  { id: "starred" as const, label: "Starred", icon: Star, count: 3, unread: 0 },
  { id: "sent" as const, label: "Sent", icon: Send, count: 8, unread: 0 },
  {
    id: "drafts" as const,
    label: "Drafts",
    icon: FileText,
    count: 2,
    unread: 0,
  },
  {
    id: "spam" as const,
    label: "Spam",
    icon: AlertTriangle,
    count: 5,
    unread: 1,
  },
  { id: "trash" as const, label: "Trash", icon: Trash2, count: 15, unread: 0 },
];

export function InboxSidebar({
  selectedCategory,
  onCategoryChange,
  onComposeClick,
}: InboxSidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-muted/30 flex flex-col h-full relative">
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Inbox</h2>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={onComposeClick}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <Button
                key={category.id}
                variant={isSelected ? "secondary" : "ghost"}
                className="w-full justify-start h-10 px-3"
                onClick={() => onCategoryChange(category.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{category.label}</span>
                <div className="flex items-center gap-1">
                  {category.unread > 0 && (
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 p-0 text-xs"
                    >
                      {category.unread}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {category.count}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Starred</span>
              <Badge variant="outline" className="h-5 w-5 p-0 text-xs">
                3
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Important</span>
              <Badge variant="outline" className="h-5 w-5 p-0 text-xs">
                7
              </Badge>
            </div>
          </div>
        </div>
      </div>
      {/* Horizontal, compact user profile bar at the bottom */}
      <div className="p-3 border-t border-border bg-muted/40 mt-auto">
        <div className="flex flex-col items-center gap-2 bg-background/80 rounded-lg px-3 py-3 shadow-sm">
          <Link href="/trading" className="w-full">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="w-full text-xs font-medium whitespace-nowrap mb-1 h-9"
            >
              <span>Back to Trading</span>
            </Button>
          </Link>
          <div className="flex items-center gap-3 w-full">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-medium">
                CN
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold leading-tight truncate">
                shadcn
              </span>
              <span className="text-xs text-muted-foreground truncate">
                sh****@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
