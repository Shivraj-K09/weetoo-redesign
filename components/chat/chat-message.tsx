"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface ChatMessageProps {
  message: {
    id: string;
    sender: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
    pending?: boolean;
    failed?: boolean;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const formattedTime = format(new Date(message.timestamp), "hh:mm a");

  return (
    <div
      className={`flex gap-3 items-start mb-4 ${
        message.pending ? "opacity-50" : ""
      } ${message.failed ? "text-red-500" : ""}`}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage
          className="rounded-full"
          src={message.sender.avatar || ""}
          alt={message.sender.name}
        />
        <AvatarFallback className="bg-muted text-muted-foreground">
          {message.sender.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-xs leading-tight">
            {message.sender.name}
          </span>
          <span className="text-xs text-muted-foreground font-normal">
            • {formattedTime}
          </span>
        </div>
        <div className="relative w-fit max-w-full">
          <div
            className="bg-background border border-border rounded-2xl shadow-sm p-3 text-[0.8rem] text-foreground font-normal min-w-[120px] max-w-[480px] whitespace-pre-line"
            style={{ wordBreak: "break-word" }}
          >
            {message.content}
          </div>
        </div>
        {message.failed && <span className="text-xs">Failed to send</span>}
      </div>
    </div>
  );
}
