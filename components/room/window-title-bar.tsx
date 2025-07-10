"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { Donation } from "@/components/room/donation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLivektHostAudio } from "@/hooks/use-livekt-host-audio";
import { cn } from "@/lib/utils";
import {
  GlobeIcon,
  LockIcon,
  MicIcon,
  MicOffIcon,
  Volume2Icon,
} from "lucide-react";

interface WindowTitleBarProps {
  roomName: string;
  isPublic: boolean;
  roomType: "regular" | "voice";
  onCloseRoom: () => void;
  onTitleBarMouseDown: (e: React.MouseEvent) => void;
  virtualBalance: number;
  hostId: string;
  roomId: string;
}

export function WindowTitleBar({
  roomName,
  isPublic,
  roomType,
  onCloseRoom,
  onTitleBarMouseDown,
  virtualBalance,
  hostId,
  roomId,
}: WindowTitleBarProps) {
  const { isMicOn, toggleMic, currentUserId, roomConnected } =
    useLivektHostAudio({ roomType, hostId, roomId });

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: settings } = useSWR("/api/app-settings", fetcher);
  const isStartingBalanceLoaded =
    settings && typeof settings.startingBalance === "number";

  const showSkeleton =
    !isStartingBalanceLoaded ||
    typeof virtualBalance !== "number" ||
    isNaN(virtualBalance);
  const isNoTrades =
    isStartingBalanceLoaded &&
    typeof virtualBalance === "number" &&
    !isNaN(virtualBalance) &&
    (virtualBalance === settings.startingBalance || virtualBalance === 0);
  const profitRate =
    isStartingBalanceLoaded &&
    typeof virtualBalance === "number" &&
    !isNaN(virtualBalance) &&
    settings.startingBalance > 0
      ? ((virtualBalance - settings.startingBalance) /
          settings.startingBalance) *
        100
      : 0;

  const router = useRouter();
  const supabase = useRef(createClient());
  const [showLateJoinWarning, setShowLateJoinWarning] = useState(true);

  useEffect(() => {
    if (!roomId) return;
    const channel = supabase.current
      .channel("room-status-" + roomId)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "trading_rooms",
          filter: `id=eq.${roomId}`,
        },
        (payload) => {
          if (payload.new?.room_status === "ended") {
            router.push("/trading");
          }
        }
      )
      .subscribe();
    return () => {
      supabase.current.removeChannel(channel);
    };
  }, [roomId, router]);

  return (
    <div className="px-3 pt-2">
      <div
        className="flex items-center justify-between h-14 px-4 border bg-muted/30 select-none"
        onMouseDown={onTitleBarMouseDown}
      >
        {/* Window Title */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-[#c3e3fa] via-[#63b3e4] to-[#7cc3f0] rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">W</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-sm truncate max-w-[200px] sm:max-w-none">
              {roomName}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-1 align-middle cursor-pointer pointer-events-auto">
                    {isPublic ? (
                      <GlobeIcon className="h-4 w-4 text-slate-500" />
                    ) : (
                      <LockIcon className="h-4 w-4 text-slate-500" />
                    )}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  {isPublic ? "Public" : "Private"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Late join audio warning for participants */}
        {roomType === "voice" &&
          currentUserId &&
          currentUserId !== hostId &&
          showLateJoinWarning && (
            <div className="flex-1 mx-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm flex items-center justify-between">
              <span className="truncate">
                🔊 Having trouble hearing the host? Ask Host to toggle their
                microphone off and on again
              </span>
              <button
                onClick={() => setShowLateJoinWarning(false)}
                className="ml-2 text-yellow-700 hover:text-yellow-900 font-bold flex-shrink-0 cursor-pointer"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          )}

        {/* Window Controls */}
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Only for Voice Rooms, and only for the creator */}
          {roomType === "voice" && currentUserId === hostId && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    onClick={toggleMic}
                    disabled={!roomConnected}
                    className={cn(
                      isMicOn
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        : "bg-red-50 hover:bg-red-100 text-red-600"
                    )}
                  >
                    {isMicOn ? (
                      <MicIcon className="h-4 w-4" />
                    ) : (
                      <MicOffIcon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  {isMicOn ? "Mute microphone" : "Unmute microphone"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* Show warning button when dismissed */}
          {currentUserId &&
            currentUserId !== hostId &&
            !showLateJoinWarning && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setShowLateJoinWarning(true)}
                    >
                      <Volume2Icon className="h-4 w-4" />
                      <span>Audio Issues Help</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="center">
                    Show audio help
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

          <Donation creatorId={hostId} roomId={roomId} key={roomId} />

          {/* Virtual Currency */}
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              Virtual Currency:
            </span>
            <span className="text-sm font-semibold">
              ${virtualBalance?.toLocaleString("en-US") ?? "-"}
            </span>
          </div>

          {/* Cummulative Profit rate*/}
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              Cumulative Profit Rate:
            </span>
            {showSkeleton ? (
              <Skeleton className="h-5 w-16 inline-block align-middle" />
            ) : isNoTrades ? (
              <span className="text-sm font-semibold">0.00%</span>
            ) : (
              <span className="text-sm font-semibold">
                {profitRate >= 0 ? "+" : ""}
                {profitRate.toFixed(2)}%
              </span>
            )}
          </div>

          {/* Close Room Button */}
          {currentUserId === hostId && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="h-8">
                  Close Room
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Close Room</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to close this room? This action cannot
                    be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      await supabase.current
                        .from("trading_rooms")
                        .update({ room_status: "ended" })
                        .eq("id", roomId);
                      router.push("/trading");
                      if (onCloseRoom) onCloseRoom();
                    }}
                    className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
                  >
                    Close Room
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
