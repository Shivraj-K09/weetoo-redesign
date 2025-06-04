"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  MoreHorizontal,
  ThumbsUp,
  Copy,
  Flag,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "motion/react";

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
    isCurrentUser?: boolean;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedTime = format(new Date(message.timestamp), "h:mm a");
  const isCurrentUser =
    message.isCurrentUser || message.sender.id === "current-user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group flex gap-2 items-start",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Avatar className="h-8 w-8 flex-shrink-0 ring-2 ring-background">
        <AvatarImage
          src={message.sender.avatar || "/placeholder.svg"}
          alt={message.sender.name}
        />
        <AvatarFallback className="text-xs bg-gradient-to-br from-[#549BCC] to-[#63b3e4] text-white">
          {message.sender.name[0]}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "max-w-[75%] flex flex-col",
          isCurrentUser && "items-end"
        )}
      >
        <div className="flex items-center gap-1 mb-1">
          <span
            className={cn(
              "text-xs font-medium text-foreground/80",
              isCurrentUser ? "order-2" : "order-1"
            )}
          >
            {isCurrentUser ? "You" : message.sender.name}
          </span>
          <span
            className={cn(
              "text-xs text-muted-foreground/70",
              isCurrentUser ? "order-1 mr-1" : "order-2 ml-1"
            )}
          >
            {formattedTime}
          </span>
        </div>

        <div className="flex items-end gap-1">
          <div
            className={cn(
              "rounded-2xl py-2 px-4 text-sm shadow-sm",
              isCurrentUser
                ? "bg-gradient-to-br from-[#549BCC] to-[#63b3e4] text-white"
                : "bg-muted/50 backdrop-blur-sm border border-border/50"
            )}
          >
            {message.content}
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-muted/50"
              onClick={toggleLike}
            >
              <ThumbsUp
                className={cn(
                  "h-3.5 w-3.5 transition-all duration-200",
                  liked
                    ? "text-[#549BCC] fill-[#549BCC] scale-110"
                    : "text-muted-foreground"
                )}
              />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-muted/50"
                >
                  <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isCurrentUser ? "end" : "start"}
                className="w-48 p-1"
              >
                <DropdownMenuItem onClick={handleCopyText} className="gap-2">
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy Text"}
                </DropdownMenuItem>
                {isCurrentUser && (
                  <DropdownMenuItem className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Message
                  </DropdownMenuItem>
                )}
                {isCurrentUser && (
                  <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                    <Trash2 className="h-4 w-4" />
                    Delete Message
                  </DropdownMenuItem>
                )}
                {!isCurrentUser && (
                  <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                    <Flag className="h-4 w-4" />
                    Report Message
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {likeCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "flex items-center mt-1",
              isCurrentUser && "justify-end"
            )}
          >
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-full py-0.5 px-2 flex items-center gap-1">
              <ThumbsUp className="h-3 w-3 text-[#549BCC] fill-[#549BCC]" />
              <span className="text-xs">{likeCount}</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
