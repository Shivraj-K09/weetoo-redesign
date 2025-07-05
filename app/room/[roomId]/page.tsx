"use client";

import { TradingRoomWindow } from "@/components/room/room-window";
import { useParams } from "next/navigation";
import { useMemo } from "react";

// Full mock data from trading-rooms-list
const mockTradingRooms: Array<{
  id: string;
  name: string;
  creator: { id: string; name: string; avatar: string };
  symbol: string;
  category: "regular" | "voice";
  createdAt: string;
  createdAtTimestamp: number;
  isPublic: boolean;
  isHosted: boolean;
  participants: number;
  pnlPercentage?: number;
}> = [
  {
    id: "1",
    name: "BTC Strategy Discussion",
    creator: { id: "user1", name: "Alex Thompson", avatar: "" },
    symbol: "BTC/USDT",
    category: "regular",
    createdAt: "2h ago",
    createdAtTimestamp: Date.now() - 2 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: true,
    participants: 24,
    pnlPercentage: 5.2,
  },
  {
    id: "2",
    name: "ETH Technical Analysis",
    creator: { id: "user2", name: "Sarah Kim", avatar: "" },
    symbol: "ETH/USDT",
    category: "voice",
    createdAt: "3h ago",
    createdAtTimestamp: Date.now() - 3 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 18,
    pnlPercentage: -2.1,
  },
  {
    id: "3",
    name: "Private Altcoin Signals",
    creator: { id: "user3", name: "Michael Chen", avatar: "" },
    symbol: "SOL/USDT",
    category: "regular",
    createdAt: "5h ago",
    createdAtTimestamp: Date.now() - 5 * 60 * 60 * 1000,
    isPublic: false,
    isHosted: false,
    participants: 7,
    pnlPercentage: 0.0,
  },
  {
    id: "4",
    name: "Korean Market Analysis",
    creator: { id: "user4", name: "Ji-Hoon Park", avatar: "" },
    symbol: "XRP/KRW",
    category: "voice",
    createdAt: "6h ago",
    createdAtTimestamp: Date.now() - 6 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 32,
    pnlPercentage: 1.7,
  },
  {
    id: "5",
    name: "Futures Trading Strategies",
    creator: { id: "user5", name: "Emma Wilson", avatar: "" },
    symbol: "BTC/USDT",
    category: "regular",
    createdAt: "8h ago",
    createdAtTimestamp: Date.now() - 8 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 15,
    pnlPercentage: -3.4,
  },
  {
    id: "6",
    name: "VIP Trading Signals",
    creator: { id: "user6", name: "David Lee", avatar: "" },
    symbol: "DOGE/USDT",
    category: "voice",
    createdAt: "10h ago",
    createdAtTimestamp: Date.now() - 10 * 60 * 60 * 1000,
    isPublic: false,
    isHosted: true,
    participants: 9,
    pnlPercentage: 2.9,
  },
  {
    id: "7",
    name: "Beginner's Trading Circle",
    creator: { id: "user7", name: "Sophia Garcia", avatar: "" },
    symbol: "ADA/USDT",
    category: "regular",
    createdAt: "12h ago",
    createdAtTimestamp: Date.now() - 12 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 41,
    pnlPercentage: 0.8,
  },
  {
    id: "8",
    name: "Institutional Trading",
    creator: { id: "user8", name: "Robert Johnson", avatar: "" },
    symbol: "ETH/BTC",
    category: "voice",
    createdAt: "1d ago",
    createdAtTimestamp: Date.now() - 24 * 60 * 60 * 1000,
    isPublic: false,
    isHosted: false,
    participants: 5,
    pnlPercentage: -1.2,
  },
  {
    id: "9",
    name: "Swing Trading Group",
    creator: { id: "user9", name: "Olivia Brown", avatar: "" },
    symbol: "LINK/USDT",
    category: "regular",
    createdAt: "1d ago",
    createdAtTimestamp: Date.now() - 24 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 27,
    pnlPercentage: 4.5,
  },
  {
    id: "10",
    name: "Day Trading Strategies",
    creator: { id: "user10", name: "William Taylor", avatar: "" },
    symbol: "BNB/USDT",
    category: "voice",
    createdAt: "2d ago",
    createdAtTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 19,
    pnlPercentage: -0.7,
  },
  {
    id: "11",
    name: "Options Trading Talk",
    creator: { id: "user11", name: "Nina Patel", avatar: "" },
    symbol: "BTC/USDT",
    category: "voice",
    createdAt: "3d ago",
    createdAtTimestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: true,
    participants: 11,
    pnlPercentage: 3.1,
  },
  {
    id: "12",
    name: "Scalping Tactics",
    creator: { id: "user12", name: "Ethan Wright", avatar: "" },
    symbol: "ETH/USDT",
    category: "regular",
    createdAt: "2d ago",
    createdAtTimestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    isPublic: false,
    isHosted: false,
    participants: 14,
    pnlPercentage: -2.8,
  },
  {
    id: "13",
    name: "High Frequency Traders",
    creator: { id: "user13", name: "Liam Martin", avatar: "" },
    symbol: "BTC/USD",
    category: "voice",
    createdAt: "4d ago",
    createdAtTimestamp: Date.now() - 4 * 24 * 60 * 60 * 1000,
    isPublic: false,
    isHosted: true,
    participants: 6,
    pnlPercentage: 1.2,
  },
  {
    id: "14",
    name: "Crypto Arbitrage",
    creator: { id: "user14", name: "Amelia Evans", avatar: "" },
    symbol: "USDT/USD",
    category: "regular",
    createdAt: "5d ago",
    createdAtTimestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 8,
    pnlPercentage: 2.3,
  },
  {
    id: "15",
    name: "DeFi Farming Discussion",
    creator: { id: "user15", name: "Carlos Diaz", avatar: "" },
    symbol: "UNI/USDT",
    category: "regular",
    createdAt: "6d ago",
    createdAtTimestamp: Date.now() - 6 * 24 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 17,
    pnlPercentage: -1.9,
  },
  {
    id: "16",
    name: "Korean Whale Watch",
    creator: { id: "user16", name: "Min-Jae Lee", avatar: "" },
    symbol: "XRP/KRW",
    category: "voice",
    createdAt: "1w ago",
    createdAtTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    isPublic: false,
    isHosted: false,
    participants: 12,
    pnlPercentage: 0.6,
  },
  {
    id: "17",
    name: "Morning Crypto Brief",
    creator: { id: "user17", name: "Grace Hall", avatar: "" },
    symbol: "ETH/USD",
    category: "regular",
    createdAt: "1w ago",
    createdAtTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: true,
    participants: 21,
    pnlPercentage: 5.0,
  },
  {
    id: "18",
    name: "Asia Market Movers",
    creator: { id: "user18", name: "Kenji Yamamoto", avatar: "" },
    symbol: "BTC/JPY",
    category: "voice",
    createdAt: "1w ago",
    createdAtTimestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 23,
    pnlPercentage: -4.2,
  },
  {
    id: "19",
    name: "Altcoin Daily Wrap",
    creator: { id: "user19", name: "Isla Moore", avatar: "" },
    symbol: "AVAX/USDT",
    category: "regular",
    createdAt: "2w ago",
    createdAtTimestamp: Date.now() - 14 * 24 * 60 * 60 * 1000,
    isPublic: false,
    isHosted: true,
    participants: 10,
    pnlPercentage: 3.7,
  },
  {
    id: "20",
    name: "Community Token Picks",
    creator: { id: "user20", name: "Daniel Green", avatar: "" },
    symbol: "MATIC/USDT",
    category: "voice",
    createdAt: "2w ago",
    createdAtTimestamp: Date.now() - 14 * 24 * 60 * 60 * 1000,
    isPublic: true,
    isHosted: false,
    participants: 26,
    pnlPercentage: -0.5,
  },
];

export default function TradingRoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  // Find the room data from mock data
  const roomData = useMemo(
    () => mockTradingRooms.find((room) => room.id === roomId),
    [roomId]
  );

  if (!roomData) {
    return <div className="p-8 text-center">Room not found.</div>;
  }

  return (
    <TradingRoomWindow
      roomName={roomData.name}
      isPublic={roomData.isPublic}
      roomType={roomData.category}
    />
  );
}
