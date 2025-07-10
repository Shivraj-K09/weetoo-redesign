import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function useVirtualBalance(roomId: string) {
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("trading_rooms")
      .select("virtual_balance")
      .eq("id", roomId)
      .single()
      .then(({ data }) => setBalance(data?.virtual_balance ?? 0));

    // Subscribe to balance changes
    const channel = supabase
      .channel("trading_rooms_balance_" + roomId)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "trading_rooms",
          filter: `id=eq.${roomId}`,
        },
        (payload) => {
          setBalance(payload.new.virtual_balance);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  return balance;
}
