"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Reply,
  Forward,
  Trash2,
  MoreHorizontal,
  Paperclip,
  Download,
  Clock,
  AlertCircle,
  Mail,
  X as CloseIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Message } from "./inbox-types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InboxMessageDetailProps {
  message: Message | null;
  onMessageUpdate: (message: Message) => void;
  onClose: () => void;
}

export function InboxMessageDetail({
  message,
  onMessageUpdate,
  onClose,
}: InboxMessageDetailProps) {
  if (!message) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Select a message</p>
          <p className="text-sm">
            Choose a message from the list to view its content
          </p>
        </div>
      </div>
    );
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    // Use consistent date formatting to avoid hydration issues
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${weekday}, ${month} ${day}, ${year} at ${displayHours}:${displayMinutes} ${ampm}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            High Priority
          </Badge>
        );
      case "normal":
        return null;
      case "low":
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            Low Priority
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleStarToggle = () => {
    const updatedMessage = { ...message, isStarred: !message.isStarred };
    onMessageUpdate(updatedMessage);
  };

  const handleMarkAsRead = () => {
    if (message.status === "unread") {
      const updatedMessage = { ...message, status: "read" as const };
      onMessageUpdate(updatedMessage);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Message Header */}
      <div className="border-b border-border p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={message.sender.avatar} />
              <AvatarFallback className="text-sm">
                {getInitials(message.sender.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold truncate">
                  {message.subject}
                </h2>
                {message.isStarred && (
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                )}
                {message.isImportant && (
                  <Badge variant="outline">Important</Badge>
                )}
                {getPriorityBadge(message.priority)}
              </div>

              <div className="text-sm text-muted-foreground">
                From: <span className="font-medium">{message.sender.name}</span>{" "}
                &lt;{message.sender.email}&gt;
              </div>

              <div className="text-sm text-muted-foreground">
                To:{" "}
                <span className="font-medium">{message.recipient.name}</span>{" "}
                &lt;{message.recipient.email}&gt;
              </div>

              <div className="text-sm text-muted-foreground">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap overflow-x-auto max-w-full pt-2 sm:pt-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStarToggle}
              className={message.isStarred ? "text-yellow-500" : ""}
            >
              <Star
                className={`h-4 w-4 ${message.isStarred ? "fill-current" : ""}`}
              />
            </Button>

            <Button variant="ghost" size="sm">
              <Reply className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm">
              <Forward className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleMarkAsRead}>
                  {message.status === "unread"
                    ? "Mark as read"
                    : "Mark as unread"}
                </DropdownMenuItem>
                <DropdownMenuItem>Move to folder</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              aria-label="Close message detail"
              onClick={onClose}
              className="ml-2"
            >
              <CloseIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
        </div>
      </ScrollArea>

      {/* Attachments */}
      {message.attachments && message.attachments.length > 0 && (
        <>
          <Separator />
          <div className="p-4">
            <h3 className="text-sm font-medium mb-3">
              Attachments ({message.attachments.length})
            </h3>
            <div className="space-y-2">
              {message.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {attachment.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)} • {attachment.type}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
