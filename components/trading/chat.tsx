import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

// Mock data for chat messages
const mockMessages = [
  {
    id: "1",
    userId: "1",
    userName: "Alex Thompson",
    avatar: "",
    message: "Welcome to the trading room! Let's discuss BTC/USDT strategy.",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    userId: "2",
    userName: "Sarah Kim",
    avatar: "",
    message: "I'm seeing a potential breakout pattern on the 4H chart.",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    userId: "3",
    userName: "Michael Chen",
    avatar: "",
    message:
      "The RSI is showing oversold conditions. Could be a good entry point.",
    timestamp: "10:32 AM",
  },
];

export function Chat() {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // TODO: Implement message sending logic
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-background sticky top-0 z-10">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Chat</span>
      </div>
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {mockMessages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar} alt={msg.userName} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {msg.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{msg.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="text-sm mt-1">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-border flex gap-2 bg-background sticky bottom-0"
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
