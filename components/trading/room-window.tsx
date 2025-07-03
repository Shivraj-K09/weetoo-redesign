"use client";

import type React from "react";
import RoomWindowContent from "./room-window-content";
import { WindowTitleBar } from "./window-title-bar";

interface TradingRoomWindowProps {
  roomName: string;
  isPublic: boolean;
}

export function TradingRoomWindow({
  roomName,
  isPublic,
}: TradingRoomWindowProps) {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <WindowTitleBar
        roomName={roomName}
        isPublic={isPublic}
        isMaximized={true}
        onCloseRoom={() => {}}
        onTitleBarMouseDown={() => {}}
        onClose={() => {}}
      />
      <div className="flex-1">
        <RoomWindowContent />
      </div>
    </div>
  );
}
