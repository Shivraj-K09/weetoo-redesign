import { NextResponse } from "next/server";
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const pageSize = Number(url.searchParams.get("pageSize") || 20);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await createClient();
  const start = Date.now();

  // Fetch paginated rooms and total count
  const {
    data: roomsData,
    error: roomsError,
    count: totalCount,
  } = await supabase
    .from("trading_rooms")
    .select(
      "id, name, creator_id, symbol, category, privacy, pnl_percentage, created_at, room_status",
      { count: "exact" }
    )
    .eq("room_status", "active")
    .order("created_at", { ascending: false })
    .range(from, to);
  if (roomsError || !roomsData) {
    return NextResponse.json({ data: [], total: 0 });
  }
  const roomIds = (roomsData as TradingRoomDb[]).map((room) => room.id);
  const creatorIds = Array.from(
    new Set((roomsData as TradingRoomDb[]).map((room) => room.creator_id))
  );

  // Fetch users, participants, positions, and app_settings in parallel
  const [usersRes, participantsRes, positionsRes, appSettingsRes] =
    await Promise.all([
      creatorIds.length > 0
        ? supabase
            .from("users")
            .select("id, first_name, last_name, avatar_url")
            .in("id", creatorIds)
        : Promise.resolve({ data: [], error: null }),
      roomIds.length > 0
        ? supabase
            .from("trading_room_participants")
            .select("room_id, user_id")
            .in("room_id", roomIds)
        : Promise.resolve({ data: [], error: null }),
      roomIds.length > 0
        ? supabase
            .from("trading_room_positions")
            .select("room_id, pnl")
            .in("room_id", roomIds)
        : Promise.resolve({ data: [], error: null }),
      supabase.from("app_settings").select("startingBalance").single(),
    ]);

  // Aggregate users
  let creatorsMap: Record<string, { name: string; avatar: string }> = {};
  if (!usersRes.error && usersRes.data) {
    creatorsMap = (usersRes.data as UserDb[]).reduce((acc, user) => {
      const fullName =
        [user.first_name, user.last_name].filter(Boolean).join(" ") || "-";
      acc[user.id] = { name: fullName, avatar: user.avatar_url || "" };
      return acc;
    }, {} as Record<string, { name: string; avatar: string }>);
  }

  // Aggregate participants
  const countsMap: Record<string, number> = {};
  if (!participantsRes.error && participantsRes.data) {
    (roomIds || []).forEach((id) => {
      countsMap[id] = 0;
    });
    ((participantsRes.data || []) as ParticipantCountDb[]).forEach((row) => {
      countsMap[row.room_id] = (countsMap[row.room_id] || 0) + 1;
    });
  }

  // Aggregate PnL
  const pnlMap: Record<string, number> = {};
  if (!positionsRes.error && positionsRes.data) {
    (roomIds || []).forEach((id) => {
      pnlMap[id] = 0;
    });
    ((positionsRes.data || []) as TradeDb[]).forEach((row) => {
      pnlMap[row.room_id] = (pnlMap[row.room_id] || 0) + Number(row.pnl || 0);
    });
  }

  // Get starting balance
  let startingBalance = 100000;
  if (
    !appSettingsRes.error &&
    appSettingsRes.data &&
    typeof appSettingsRes.data.startingBalance === "number"
  ) {
    startingBalance = appSettingsRes.data.startingBalance;
  }

  // Map final result
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
      participants: countsMap[room.id] ?? 0,
      pnlPercentage: pnlPercent,
    };
  });
  const end = Date.now();
  console.log("API /api/trading-rooms total time:", end - start, "ms");
  return NextResponse.json({ data: mapped, total: totalCount || 0 });
}
