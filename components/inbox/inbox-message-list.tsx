"use client";

import { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Star,
  Paperclip,
  MoreHorizontal,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Message, MessageCategory } from "./inbox-types";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for messages
const mockMessages: Message[] = [
  {
    id: "1",
    subject: "Welcome to Weetoo Platform",
    content:
      "Thank you for joining our platform. We're excited to have you on board!",
    sender: {
      name: "Weetoo Team",
      email: "team@weetoo.com",
      avatar: "",
    },
    recipient: {
      name: "John Doe",
      email: "john@example.com",
    },
    category: "inbox",
    status: "unread",
    priority: "normal",
    timestamp: "2024-01-15T10:30:00Z",
    isStarred: true,
    isImportant: true,
  },
  {
    id: "2",
    subject: "Account Verification Required",
    content: "Please verify your email address to complete your account setup.",
    sender: {
      name: "Security Team",
      email: "security@weetoo.com",
      avatar: "",
    },
    recipient: {
      name: "John Doe",
      email: "john@example.com",
    },
    category: "inbox",
    status: "unread",
    priority: "high",
    timestamp: "2024-01-15T09:15:00Z",
    isStarred: false,
    isImportant: true,
  },
  {
    id: "3",
    subject: "Weekly Trading Report",
    content: "Here's your weekly trading performance summary and insights.",
    sender: {
      name: "Analytics Team",
      email: "analytics@weetoo.com",
      avatar: "",
    },
    recipient: {
      name: "John Doe",
      email: "john@example.com",
    },
    category: "inbox",
    status: "read",
    priority: "normal",
    timestamp: "2024-01-14T16:45:00Z",
    attachments: [
      { name: "report.pdf", size: 1024000, type: "application/pdf" },
    ],
    isStarred: false,
    isImportant: false,
  },
  {
    id: "4",
    subject: "Community Guidelines Update",
    content:
      "We've updated our community guidelines. Please review the changes.",
    sender: {
      name: "Community Manager",
      email: "community@weetoo.com",
      avatar: "",
    },
    recipient: {
      name: "John Doe",
      email: "john@example.com",
    },
    category: "inbox",
    status: "read",
    priority: "low",
    timestamp: "2024-01-14T14:20:00Z",
    isStarred: false,
    isImportant: false,
  },
  {
    id: "5",
    subject: "New Feature Announcement",
    content: "We're excited to announce new trading features available now!",
    sender: {
      name: "Product Team",
      email: "product@weetoo.com",
      avatar: "",
    },
    recipient: {
      name: "John Doe",
      email: "john@example.com",
    },
    category: "inbox",
    status: "read",
    priority: "normal",
    timestamp: "2024-01-13T11:00:00Z",
    isStarred: true,
    isImportant: false,
  },
];

interface InboxMessageListProps {
  searchQuery: string;
  selectedCategory: MessageCategory;
  selectedStatus: "all" | "read" | "unread";
  selectedMessage: Message | null;
  onMessageSelect: (message: Message) => void;
}

export function InboxMessageList({
  searchQuery,
  selectedCategory,
  selectedStatus,
  selectedMessage,
  onMessageSelect,
}: InboxMessageListProps) {
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(
    new Set()
  );

  const filteredMessages = useMemo(() => {
    return mockMessages.filter((message) => {
      // Category filter
      if (selectedCategory === "starred") {
        if (!message.isStarred) return false;
      } else if (
        selectedCategory !== "all" &&
        message.category !== selectedCategory
      ) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "all" && message.status !== selectedStatus) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          message.subject.toLowerCase().includes(query) ||
          message.content.toLowerCase().includes(query) ||
          message.sender.name.toLowerCase().includes(query) ||
          message.sender.email.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      // Use consistent date formatting to avoid hydration issues
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      case "normal":
        return null;
      case "low":
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const handleMessageSelect = (messageId: string, checked: boolean) => {
    const newSelected = new Set(selectedMessages);
    if (checked) {
      newSelected.add(messageId);
    } else {
      newSelected.delete(messageId);
    }
    setSelectedMessages(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMessages(new Set(filteredMessages.map((m) => m.id)));
    } else {
      setSelectedMessages(new Set());
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={
              selectedMessages.size === filteredMessages.length &&
              filteredMessages.length > 0
            }
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">
            {selectedMessages.size > 0
              ? `${selectedMessages.size} selected`
              : `${filteredMessages.length} messages`}
          </span>
        </div>
      </div>

      {/* Message List */}
      <ScrollArea className="flex-1">
        {filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No messages found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`group p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id ? "bg-muted" : ""
                } ${
                  message.status === "unread"
                    ? "bg-blue-50/50 dark:bg-blue-950/20"
                    : ""
                }`}
                onClick={() => onMessageSelect(message)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedMessages.has(message.id)}
                    onCheckedChange={(checked) =>
                      handleMessageSelect(message.id, checked as boolean)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback className="text-xs">
                          {getInitials(message.sender.name)}
                        </AvatarFallback>
                      </Avatar>

                      <span
                        className={`text-sm font-medium truncate ${
                          message.status === "unread" ? "font-semibold" : ""
                        }`}
                      >
                        {message.sender.name}
                      </span>

                      {message.isStarred && (
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      )}

                      {message.isImportant && (
                        <Badge variant="outline" className="h-4 px-1 text-xs">
                          Important
                        </Badge>
                      )}

                      {getPriorityIcon(message.priority)}

                      {message.attachments &&
                        message.attachments.length > 0 && (
                          <Paperclip className="h-3 w-3 text-muted-foreground" />
                        )}
                    </div>

                    <div
                      className={`text-sm truncate mb-1 ${
                        message.status === "unread" ? "font-semibold" : ""
                      }`}
                    >
                      {message.subject}
                    </div>

                    <div className="text-xs text-muted-foreground truncate">
                      {message.content}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Mark as read</DropdownMenuItem>
                        <DropdownMenuItem>Star</DropdownMenuItem>
                        <DropdownMenuItem>Move to trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
