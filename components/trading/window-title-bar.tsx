"use client";

import type React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { GlobeIcon, LockIcon, XIcon } from "lucide-react";
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
import { Button } from "../ui/button";

interface WindowTitleBarProps {
  roomName: string;
  isPublic: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onCloseRoom: () => void;
  onTitleBarMouseDown: (e: React.MouseEvent) => void;
}

export function WindowTitleBar({
  roomName,
  isPublic,
  isMaximized,
  onClose,
  onCloseRoom,
  onTitleBarMouseDown,
}: WindowTitleBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between h-14 px-4 bg-muted/30 select-none",
        !isMaximized && window.innerWidth >= 768 && "cursor-move",
        isMaximized ? "rounded-none" : "rounded-t-lg",
        "sm:rounded-t-lg" // Keep rounded corners on larger screens
      )}
      onMouseDown={onTitleBarMouseDown}
    >
      {/* Window Title */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-gradient-to-br from-[#549BCC] via-[#63b3e4] to-[#7cc3f0] rounded-md flex items-center justify-center">
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
                Are you sure you want to close this room? This action cannot be
                undone.
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
        {/* Close (X) Button */}
        <button
          onClick={onClose}
          className="w-8 h-8 cursor-pointer flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors rounded"
          aria-label="Close"
        >
          <XIcon className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
