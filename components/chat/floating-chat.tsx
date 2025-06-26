"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRoomStore } from "@/lib/store/room-store";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  Coins,
  MessageSquare,
  MinusIcon,
  SendIcon,
  Star,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./chat-message";
import { mockMessages, mockOnlineUsers } from "./mock-data";

export function FloatingChat() {
  const isRoomOpen = useRoomStore(
    (state: { isRoomOpen: boolean }) => state.isRoomOpen
  );
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("chatState");
      return savedState ? JSON.parse(savedState).isOpen : false;
    }
    return false;
  });
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("chatState");
      return savedState ? JSON.parse(savedState).isMinimized : false;
    }
    return false;
  });
  const [showUsersList, setShowUsersList] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(2);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "chatState",
        JSON.stringify({
          isOpen,
          isMinimized,
        })
      );
    }
  }, [isOpen, isMinimized]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  // Reset unread count when opening chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnreadCount(0);
    }
  }, [isOpen, isMinimized]);

  // Simulate receiving a new message every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen || isMinimized) {
        const randomUser =
          mockOnlineUsers[Math.floor(Math.random() * mockOnlineUsers.length)];
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender: {
            id: randomUser.id,
            name: randomUser.name,
            avatar: randomUser.avatar,
          },
          content: `Hey everyone! Just checking in. What's happening in the markets today?`,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);
        setUnreadCount((prev) => prev + 1);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [isOpen, isMinimized]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: `msg-${Date.now()}`,
        sender: {
          id: "current-user",
          name: "You",
          avatar: "",
        },
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isCurrentUser: true,
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setUnreadCount(0);
    } else {
      if (isMinimized) {
        setIsMinimized(false);
        setUnreadCount(0);
      } else {
        setIsOpen(false);
      }
    }
  };

  // Add this function to always close the chat
  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const toggleUsersList = () => {
    setShowUsersList(!showUsersList);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && !isRoomOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[98vw] max-w-[420px] p-0 sm:bottom-12 sm:left-6 sm:translate-x-0 sm:w-auto sm:max-w-none sm:p-0"
          >
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleChat}
                className="rounded-full shadow-lg bg-gradient-to-br from-[#549BCC] to-[#63b3e4] hover:from-[#63b3e4] hover:to-[#549BCC] relative transition-all duration-300 h-11 px-2 text-xs flex items-center justify-center space-x-1 whitespace-nowrap cursor-pointer sm:h-12 sm:px-3 sm:text-sm"
              >
                <MessageSquare className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                <span className="font-medium text-white">Chat</span>
                {unreadCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 bg-red-500 text-white border-2 border-background h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px] sm:h-6 sm:w-6 sm:text-xs"
                    variant="secondary"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isRoomOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={
              isMinimized
                ? { opacity: 1, y: 0, scale: 1, height: "auto" }
                : { opacity: 1, y: 0, scale: 1, height: "90vh" }
            }
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              // Mobile: bottom center, full width, max height. Desktop: bottom left, fixed size.
              "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-background rounded-md shadow-lg border border-border overflow-hidden flex flex-col w-[98vw] max-w-[420px] h-[90vh] p-0 m-0 right-auto min-w-0 sm:bottom-12 sm:left-6 sm:translate-x-0 sm:w-[380px] sm:max-w-none sm:h-[90vh] sm:rounded-lg sm:shadow-xl sm:border sm:p-0 sm:m-0",
              isMinimized
                ? "w-[90vw] max-w-[340px] h-auto sm:w-[300px] sm:max-w-none sm:h-auto"
                : "w-[98vw] max-w-[420px] h-[90vh] sm:w-[380px] sm:max-w-none sm:h-[90vh]"
            )}
          >
            {/* Chat Header */}
            <div className="bg-[#549BCC]/10 border-b border-border p-2 flex items-center justify-between gap-1 min-w-0 sm:p-3">
              <div className="flex items-center gap-1 min-w-0 flex-1 sm:gap-2">
                <MessageSquare className="h-4 w-4 text-[#549BCC] sm:h-5 sm:w-5" />
                <h3 className="font-medium text-xs truncate sm:text-sm">
                  Global Chat
                </h3>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-600 border-green-200 text-[10px] px-1 py-0.5 sm:text-xs sm:px-2 sm:py-0.5"
                >
                  {mockOnlineUsers.length} online
                </Badge>
              </div>
              <div className="flex items-center gap-1 min-w-0 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  onClick={toggleUsersList}
                  disabled={isMinimized}
                >
                  <Users className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  onClick={minimizeChat}
                >
                  <MinusIcon className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  onClick={closeChat}
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Profile Section */}
                <div className="bg-gradient-to-r from-[#549BCC]/5 to-[#63b3e4]/5 border-b border-border p-2 sm:p-3">
                  <div className="flex items-center gap-2 min-w-0 sm:gap-3">
                    <Avatar className="h-8 w-8 ring-2 ring-[#549BCC]/20 sm:h-12 sm:w-12">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-[#549BCC] to-[#63b3e4] text-white text-xs sm:text-base">
                        U
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs truncate sm:text-sm">
                        User Name
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 sm:gap-4 sm:mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-yellow-500 sm:h-4 sm:w-4" />
                          <span className="text-[10px] text-muted-foreground sm:text-xs">
                            1,234 XP
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="h-3.5 w-3.5 text-amber-500 sm:h-4 sm:w-4" />
                          <span className="text-[10px] text-muted-foreground sm:text-xs">
                            567 KOR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Experience Level - Redesigned for minimal and clean look */}
                  <div className="w-full flex flex-col gap-y-0.5 mt-1 sm:mt-2 sm:gap-y-1">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground sm:text-xs">
                      <span>Level 0</span>
                      <span>Level 1</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700 sm:h-1.5">
                      <div
                        className="bg-red-500 h-1 rounded-full sm:h-1.5"
                        style={{ width: `4%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground sm:text-xs">
                      <span>4% Complete</span>
                      <span className="text-red-500">450 EXP</span>
                    </div>
                  </div>
                </div>

                {/* Chat Body with Messages */}
                <div className="relative flex-1 min-h-0 min-w-0">
                  <div className="absolute inset-0 overflow-y-auto p-2 space-y-2 scrollbar-thin min-w-0 sm:p-3 sm:space-y-3">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-2 border-t border-border bg-background/80 backdrop-blur-sm sm:p-4">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-2 min-w-0 sm:gap-3"
                  >
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 h-9 text-xs rounded-md px-2 min-w-0 sm:h-12 sm:text-sm sm:px-4"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="h-9 w-9 rounded-md bg-[#549BCC] hover:bg-[#63b3e4] flex items-center justify-center sm:h-12 sm:w-12"
                    >
                      <SendIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </form>
                </div>

                {/* Online Users Sidebar */}
                <AnimatePresence>
                  {showUsersList && (
                    <motion.div
                      initial={{ opacity: 0, x: "100%" }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: "100%" }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-[38px] right-0 bottom-0 w-[110px] bg-background border-l border-border overflow-y-auto text-xs p-0 min-w-0 sm:top-[46px] sm:w-[140px] sm:text-xs sm:p-0"
                    >
                      <div className="p-2 sm:p-3">
                        <h4 className="font-medium text-[10px] text-muted-foreground mb-2 sm:text-xs sm:mb-3">
                          Online Users
                        </h4>
                        <div className="space-y-1 sm:space-y-2">
                          {mockOnlineUsers.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center gap-1 sm:gap-2"
                            >
                              <div className="relative">
                                <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                                  <AvatarImage
                                    src={user.avatar || ""}
                                    alt={user.name}
                                  />
                                  <AvatarFallback className="text-[10px] sm:text-xs">
                                    {user.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-500 rounded-full border border-background sm:w-2 sm:h-2"></span>
                              </div>
                              <span className="truncate text-[10px] sm:text-xs">
                                {user.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* Minimized View */}
            {isMinimized && (
              <div className="p-2 flex items-center justify-between gap-1 min-w-0 sm:p-3">
                <div className="flex items-center gap-1 min-w-0 flex-1 sm:gap-2">
                  <Badge className="bg-green-500 text-white border-0 h-4 w-4 p-0 flex items-center justify-center rounded-full text-[10px] sm:h-5 sm:w-5 sm:text-xs">
                    {mockOnlineUsers.length}
                  </Badge>
                  <span className="text-xs truncate sm:text-sm">
                    Global Chat
                  </span>
                </div>
                <div className="flex items-center gap-1 min-w-0 flex-shrink-0">
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white border-0 text-[10px] px-1 py-0.5 sm:text-xs sm:px-2 sm:py-0.5">
                      {unreadCount} new
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(false)}
                    className="h-6 w-6 p-0 sm:h-7 sm:w-7"
                  >
                    <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
