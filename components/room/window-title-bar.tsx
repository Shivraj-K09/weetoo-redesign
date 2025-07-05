"use client";

import type React from "react";
import { useState } from "react";

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
import { GlobeIcon, LockIcon, MicIcon, MicOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WindowTitleBarProps {
  roomName: string;
  isPublic: boolean;
  roomType: "regular" | "voice";
  onCloseRoom: () => void;
  onTitleBarMouseDown: (e: React.MouseEvent) => void;
}

export function WindowTitleBar({
  roomName,
  isPublic,
  roomType,
  onCloseRoom,
  onTitleBarMouseDown,
}: WindowTitleBarProps) {
  const [isMicOn, setIsMicOn] = useState(true);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

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

        {/* Window Controls */}
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Microphone Design - Only for Voice Rooms */}
          {roomType === "voice" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={toggleMic}
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

          {/* Cummulative Profit rate*/}
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              Cumulative Profit Rate:
            </span>
            <span className="text-sm font-semibold">+0.00%</span>
          </div>
          {/* Close Room Button with AlertDialog */}
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
                  onClick={onCloseRoom}
                  className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
                >
                  Close Room
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
