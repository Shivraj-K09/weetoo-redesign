import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/lib/supabase/client";
import { Crown, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  role: string;
}

interface ParticipantRow {
  user_id: string;
  left_at: string | null;
}

interface UserRow {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role?: string;
  status?: string;
}

export function ParticipantsList({
  roomId,
  hostId,
}: {
  roomId: string;
  hostId: string;
}) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const supabaseRef = useRef(createClient());

  useEffect(() => {
    const supabase = supabaseRef.current;
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUserId(data.user?.id || null);
    });
  }, []);

  // Helper to map user row or payload to Participant
  function mapUser(user: UserRow | ParticipantRow): Participant {
    if ("id" in user) {
      return {
        id: user.id,
        name:
          [user.first_name, user.last_name].filter(Boolean).join(" ") || "-",
        avatar: user.avatar_url || "",
        isOnline: user.status === "Active",
        role: user.role || "member",
      };
    }
    // Fallback for ParticipantRow (should not be used for display)
    return {
      id: user.user_id,
      name: "-",
      avatar: "",
      isOnline: true,
      role: "member",
    };
  }

  // Fetch participants function for initial load
  async function fetchParticipants() {
    const supabase = supabaseRef.current;
    const { data: participantRows, error } = await supabase
      .from("trading_room_participants")
      .select("user_id, left_at")
      .eq("room_id", roomId)
      .is("left_at", null);
    if (error || !participantRows) {
      setParticipants([]);
      return;
    }
    const userIds = (participantRows as ParticipantRow[]).map((p) => p.user_id);
    if (userIds.length === 0) {
      setParticipants([]);
      return;
    }
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id, first_name, last_name, avatar_url, role, status")
      .in("id", userIds);
    if (userError || !users) {
      setParticipants([]);
      return;
    }
    let mapped = (users as UserRow[]).map(mapUser);
    // Sort so host is at the top
    mapped = mapped.sort((a, b) => {
      if (a.id === hostId) return -1;
      if (b.id === hostId) return 1;
      return 0;
    });
    setParticipants(mapped);
  }

  useEffect(() => {
    fetchParticipants(); // Only on mount/roomId change
    // Subscribe to realtime changes
    const channel = supabaseRef.current
      .channel("room-participants-" + roomId)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "trading_room_participants",
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          setParticipants((prev) => {
            if (payload.eventType === "INSERT") {
              // Fetch user info for the new participant
              const userId = payload.new.user_id;
              supabaseRef.current
                .from("users")
                .select("id, first_name, last_name, avatar_url, role, status")
                .eq("id", userId)
                .single()
                .then(({ data: user }) => {
                  if (user) {
                    setParticipants((current) => {
                      // Avoid duplicates
                      if (current.some((p) => p.id === userId)) return current;
                      let updated = [...current, mapUser(user as UserRow)];
                      // Sort so host is at the top
                      updated = updated.sort((a, b) => {
                        if (a.id === hostId) return -1;
                        if (b.id === hostId) return 1;
                        return 0;
                      });
                      return updated;
                    });
                  }
                });
              return prev;
            }
            if (payload.eventType === "UPDATE") {
              // If left_at is set, remove participant
              if (payload.new.left_at) {
                return prev.filter((p) => p.id !== payload.new.user_id);
              }
              // Otherwise, update participant info
              const userId = payload.new.user_id;
              supabaseRef.current
                .from("users")
                .select("id, first_name, last_name, avatar_url, role, status")
                .eq("id", userId)
                .single()
                .then(({ data: user }) => {
                  if (user) {
                    setParticipants((current) => {
                      let updated = current.map((p) =>
                        p.id === userId ? mapUser(user as UserRow) : p
                      );
                      // Sort so host is at the top
                      updated = updated.sort((a, b) => {
                        if (a.id === hostId) return -1;
                        if (b.id === hostId) return 1;
                        return 0;
                      });
                      return updated;
                    });
                  }
                });
              return prev;
            }
            if (payload.eventType === "DELETE") {
              return prev.filter((p) => p.id !== payload.old.user_id);
            }
            return prev;
          });
        }
      )
      .subscribe();
    return () => {
      supabaseRef.current.removeChannel(channel);
    };
  }, [roomId, hostId]);

  const handleJoinRoom = () => {
    if (!currentUserId) {
      toast.error("Please log in to join the room.", {
        description: "You must be logged in to participate.",
      });
      return;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-background sticky top-0 z-10 select-none">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Participants</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {participants.length}
        </span>
      </div>
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-2">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage
                    src={participant.avatar}
                    alt={participant.name}
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {participant.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {/* <span
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background ${
                    participant.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                /> */}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{participant.name}</span>
                <div className="text-xs text-muted-foreground capitalize">
                  {participant.id === hostId ? (
                    <div className="flex items-center gap-0">
                      <span>Host</span>
                      <Crown className="inline-block ml-1 h-3 w-3 text-amber-400 align-text-bottom" />
                    </div>
                  ) : (
                    "Participant"
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Show join button for not-logged-in users */}
          {!currentUserId && (
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 rounded bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition"
                onClick={handleJoinRoom}
              >
                Join Room
              </button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
