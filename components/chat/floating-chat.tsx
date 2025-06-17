"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useRoomStore } from "@/lib/store/room-store";

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
            className="fixed bottom-6 left-6 z-50"
          >
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleChat}
                className="rounded-full shadow-lg bg-gradient-to-br from-[#549BCC] to-[#63b3e4] hover:from-[#63b3e4] hover:to-[#549BCC] relative transition-all duration-300 h-12 px-3 flex items-center justify-center space-x-1 whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white">Chat</span>

                {unreadCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 bg-red-500 text-white border-2 border-background h-6 w-6 p-0 flex items-center justify-center rounded-full"
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
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "650px",
              width: isMinimized ? "300px" : "380px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-6 left-6 z-50 bg-background rounded-lg shadow-xl border border-border overflow-hidden flex flex-col",
              isMinimized ? "shadow-md" : "shadow-xl"
            )}
          >
            {/* Chat Header */}
            <div className="bg-[#549BCC]/10 border-b border-border p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#549BCC]" />
                <h3 className="font-medium text-sm">Global Chat</h3>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-600 border-green-200 text-xs"
                >
                  {mockOnlineUsers.length} online
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={toggleUsersList}
                  disabled={isMinimized}
                >
                  <Users className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={minimizeChat}
                >
                  <MinusIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={toggleChat}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Profile Section */}
                <div className="bg-gradient-to-r from-[#549BCC]/5 to-[#63b3e4]/5 border-b border-border p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-[#549BCC]/20">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-[#549BCC] to-[#63b3e4] text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">User Name</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">
                            1,234 XP
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-amber-500" />
                          <span className="text-xs text-muted-foreground">
                            567 KOR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Experience Level - Redesigned for minimal and clean look */}
                  <div className="w-full flex flex-col gap-y-1 mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Level 0</span>
                      <span>Level 1</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div
                        className="bg-red-500 h-1.5 rounded-full"
                        style={{ width: `4%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>4% Complete</span>
                      <span className="text-red-500">450 EXP</span>
                    </div>
                  </div>
                </div>

                {/* Chat Body with Messages */}
                <div className="relative flex-1">
                  <div className="absolute inset-0 overflow-y-auto p-3 space-y-3 scrollbar-thin">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-3"
                  >
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 h-12 text-sm rounded-md px-4"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="h-12 w-12 rounded-md bg-[#549BCC] hover:bg-[#63b3e4] flex items-center justify-center"
                    >
                      <SendIcon className="h-5 w-5" />
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
                      className="absolute top-[46px] right-0 bottom-0 w-[140px] bg-background border-l border-border overflow-y-auto"
                    >
                      <div className="p-3">
                        <h4 className="text-xs font-medium text-muted-foreground mb-3">
                          Online Users
                        </h4>
                        <div className="space-y-2">
                          {mockOnlineUsers.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center gap-2"
                            >
                              <div className="relative">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={user.avatar || ""}
                                    alt={user.name}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {user.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background"></span>
                              </div>
                              <span className="text-xs truncate">
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
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white border-0 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {mockOnlineUsers.length}
                  </Badge>
                  <span className="text-sm">Global Chat</span>
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500 text-white border-0">
                      {unreadCount} new
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(false)}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronUp className="h-4 w-4" />
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
