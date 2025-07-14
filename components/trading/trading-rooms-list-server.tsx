import { TradingRoomsList } from "@/components/trading/trading-rooms-list";
import { createClient } from "@/lib/supabase/server";

interface TradingRoomDb {
  id: string;
  name: string;
  creator_id: string;
  symbol: string;
  category: "regular" | "voice";
  privacy: "public" | "private";
  pnl_percentage: number | null;
  created_at: string;
  room_status: string;
}

interface UserDb {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

interface ParticipantCountDb {
  room_id: string;
  user_id: string;
}

interface TradeDb {
  room_id: string;
  pnl: number | null;
}

export async function TradingRoomsListServer() {
  const supabase = await createClient();
  const { data: roomsData, error: roomsError } = await supabase
    .from("trading_rooms")
    .select(
      "id, name, creator_id, symbol, category, privacy, pnl_percentage, created_at, room_status"
    )
    .eq("room_status", "active")
    .order("created_at", { ascending: false });
  if (roomsError || !roomsData) {
    return <TradingRoomsList initialRooms={[]} />;
  }
  const creatorIds = Array.from(
    new Set((roomsData as TradingRoomDb[]).map((room) => room.creator_id))
  );
  let creatorsMap: Record<string, { name: string; avatar: string }> = {};
  if (creatorIds.length > 0) {
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("id, first_name, last_name, avatar_url")
      .in("id", creatorIds);
    if (!usersError && usersData) {
      creatorsMap = (usersData as UserDb[]).reduce((acc, user) => {
        const fullName =
          [user.first_name, user.last_name].filter(Boolean).join(" ") || "-";
        acc[user.id] = { name: fullName, avatar: user.avatar_url || "" };
        return acc;
      }, {} as Record<string, { name: string; avatar: string }>);
    }
  }
  const roomIds = (roomsData as TradingRoomDb[]).map((room) => room.id);
  let countsMap: Record<string, number> = {};
  if (roomIds.length > 0) {
    const { data: countsData } = await supabase
      .from("trading_room_participants")
      .select("room_id, user_id")
      .in("room_id", roomIds);
    countsMap = {};
    (roomIds || []).forEach((id) => {
      countsMap[id] = 0;
    });
    ((countsData || []) as ParticipantCountDb[]).forEach((row) => {
      countsMap[row.room_id] = (countsMap[row.room_id] || 0) + 1;
    });
  }
  let pnlMap: Record<string, number> = {};
  if (roomIds.length > 0) {
    const { data: tradesData } = await supabase
      .from("trading_room_positions")
      .select("room_id, pnl")
      .in("room_id", roomIds);
    pnlMap = {};
    (roomIds || []).forEach((id) => {
      pnlMap[id] = 0;
    });
    ((tradesData || []) as TradeDb[]).forEach((row) => {
      pnlMap[row.room_id] = (pnlMap[row.room_id] || 0) + Number(row.pnl || 0);
    });
  }
  // Fetch starting virtual balance from app_settings
  let startingBalance = 100000;
  try {
    const { data: appSettings } = await supabase
      .from("app_settings")
      .select("startingBalance")
      .single();
    if (appSettings && typeof appSettings.startingBalance === "number") {
      startingBalance = appSettings.startingBalance;
    }
  } catch (_e) {}
  const mapped = (roomsData as TradingRoomDb[]).map((room) => {
    const creator = creatorsMap[room.creator_id] || {
      name: "-",
      avatar: "",
    };
    const totalPnl = pnlMap[room.id] || 0;
    const pnlPercent = startingBalance ? (totalPnl / startingBalance) * 100 : 0;
    const dateObj = new Date(room.created_at);
    const isValidDate = !isNaN(dateObj.getTime());
    const createdAt = isValidDate ? dateObj.toISOString() : "-";
    const createdAtTimestamp = isValidDate ? dateObj.getTime() : 0;
    return {
      id: room.id,
      name: room.name,
      creator: {
        id: room.creator_id,
        name: creator.name,
        avatar: creator.avatar,
      },
      symbol: room.symbol,
      category: room.category,
      createdAt,
      createdAtTimestamp,
      isPublic: room.privacy === "public",
      isHosted: false, // will be set on client
      participants: countsMap[room.id] ?? 0,
      pnlPercentage: pnlPercent,
    };
  });
  return <TradingRoomsList initialRooms={mapped} />;
}
