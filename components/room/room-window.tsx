"use client";

import { useVirtualBalance } from "@/hooks/use-virtual-balance";
import { RoomWindowContent } from "./room-window-content";
import { WindowTitleBar } from "./window-title-bar";

interface TradingRoomWindowProps {
  roomName: string;
  isPublic: boolean;
  roomType: "regular" | "voice";
  symbol: string;
  roomId: string;
  hostId: string;
  virtualBalance: number;
}

export function TradingRoomWindow({
  roomName,
  isPublic,
  roomType,
  symbol,
  roomId,
  hostId,
  virtualBalance: _virtualBalance, // ignore static prop
}: TradingRoomWindowProps) {
  const virtualBalance = useVirtualBalance(roomId);
  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <WindowTitleBar
        roomName={roomName}
        isPublic={isPublic}
        roomType={roomType}
        onCloseRoom={() => {}}
        onTitleBarMouseDown={() => {}}
        virtualBalance={virtualBalance ?? 0}
        hostId={hostId}
        roomId={roomId}
      />
      <div className="flex-1">
        <RoomWindowContent
          symbol={symbol}
          roomId={roomId}
          hostId={hostId}
          virtualBalance={virtualBalance ?? 0}
          roomType={roomType}
        />
      </div>
    </div>
  );
}
