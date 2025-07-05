import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";

// Mock data for participants
const mockParticipants = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "",
    isOnline: true,
    role: "host",
  },
  {
    id: "2",
    name: "Sarah Kim",
    avatar: "",
    isOnline: true,
    role: "moderator",
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "",
    isOnline: false,
    role: "member",
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "",
    isOnline: true,
    role: "member",
  },
  {
    id: "5",
    name: "David Lee",
    avatar: "",
    isOnline: true,
    role: "member",
  },
];

export function ParticipantsList() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-background sticky top-0 z-10">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Participants</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {mockParticipants.length}
        </span>
      </div>
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {mockParticipants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={participant.avatar}
                    alt={participant.name}
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {participant.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${
                    participant.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{participant.name}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {participant.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
