import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon, Eye, EyeOff, Coins, Wallet } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "../ui/skeleton";

interface UserData {
  id: string;
  kor_coins?: number;
}

export function CreateRoom() {
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [category, setCategory] = useState("regular");
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const lastSessionId = useRef<string | null>(null);

  // Fetch user data including KOR coins
  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      const sessionId = data.session?.user?.id || null;

      if (lastSessionId.current === sessionId && user) {
        setLoading(false);
        return;
      }
      lastSessionId.current = sessionId;
      if (!sessionId) {
        if (mounted) setLoading(false);
        return;
      }
      setLoading(true);

      supabase
        .from("users")
        .select("id, kor_coins")
        .eq("id", sessionId)
        .single()
        .then(({ data, error }) => {
          if (mounted) {
            if (error) {
              console.error("Failed to fetch user data:", error);
            }
            setUser(error ? null : data);
            setLoading(false);
          }
        });
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionId = session?.user?.id || null;
        if (lastSessionId.current === sessionId && user) {
          setLoading(false);
          return;
        }
        lastSessionId.current = sessionId;
        if (!sessionId) {
          setUser(null);
          setLoading(false);
          return;
        }
        setLoading(true);
        supabase
          .from("users")
          .select("id, kor_coins")
          .eq("id", sessionId)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error("Failed to fetch user data on auth change:", error);
            }
            setUser(error ? null : data);
            setLoading(false);
          });
      }
    );

    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Get user KOR coins with fallback
  const userKorCoins = useMemo(() => {
    return user?.kor_coins ?? 0;
  }, [user?.kor_coins]);

  // Format number with K suffix for display
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Cost calculation based on room category
  const getRoomCost = (category: string) => {
    switch (category) {
      case "voice":
        return 8000;
      case "regular":
      default:
        return 5000;
    }
  };

  const roomCost = getRoomCost(category);
  const canAfford = userKorCoins >= roomCost;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto cursor-pointer">
          <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-background border border-border rounded-lg p-0 shadow-none">
        <DialogHeader className="px-6 pt-6 pb-2 gap-1">
          <DialogTitle className="font-semibold flex items-center gap-2 text-lg text-foreground">
            Create Trading Room
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set up your trading room details below.
          </DialogDescription>
        </DialogHeader>
        <div className="border-b border-border mx-6" />
        <form className="px-6 py-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="room-name"
                className="font-medium text-sm text-foreground mb-1"
              >
                Room Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="room-name"
                placeholder="Enter room name"
                required
                className="text-sm h-10"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label
                htmlFor="privacy"
                className="font-medium text-sm text-foreground mb-1"
              >
                Privacy
              </Label>
              <Select value={privacy} onValueChange={setPrivacy}>
                <SelectTrigger id="privacy" className="w-full text-sm h-10">
                  <SelectValue placeholder="Select privacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {privacy === "private" && (
              <div className="flex flex-col gap-1 md:col-span-2 animate-fade-in relative">
                <Label
                  htmlFor="room-password"
                  className="font-medium text-sm text-foreground mb-1"
                >
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="room-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter room password"
                  required
                  className="text-sm pr-10 h-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-10 text-muted-foreground hover:text-foreground focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="symbol"
              className="font-medium text-sm text-foreground mb-1"
            >
              Symbol
            </Label>
            <Select value={symbol} onValueChange={setSymbol}>
              <SelectTrigger id="symbol" className="w-full text-sm h-10">
                <SelectValue placeholder="Select symbol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTCUSDT">BTCUSDT</SelectItem>
                <SelectItem value="ETHUSDT">ETHUSDT</SelectItem>
                <SelectItem value="BNBUSDT">BNBUSDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="category"
              className="font-medium text-sm text-foreground mb-1"
            >
              Room Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="w-full text-sm h-10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular Room</SelectItem>
                <SelectItem value="voice">Voice Room</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Balance Display */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/30 dark:to-slate-900/30 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <Wallet className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Available Balance
                  </p>
                  {loading ? (
                    <Skeleton className="h-6 w-20" />
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-lg font-bold text-foreground cursor-help">
                            {formatNumber(userKorCoins)} KOR
                          </p>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" align="center">
                          <p>{userKorCoins.toLocaleString()} KOR</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Room Cost</p>
                <p
                  className={`text-lg font-bold ${
                    canAfford
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {roomCost.toLocaleString()} KOR
                </p>
              </div>
            </div>

            {/* Room Features */}
            <div className="flex items-start gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="p-1.5 bg-amber-50 dark:bg-amber-950/30 rounded-md">
                <Coins className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground mb-1">
                  Room Features:
                </p>
                <p className="text-xs text-muted-foreground">
                  {category === "voice"
                    ? "Host can speak, participants can ask questions via text chat"
                    : "Host and participants can communicate via text chat"}
                </p>
                {!loading && !canAfford && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
                    ⚠️ Insufficient balance. You need{" "}
                    {(roomCost - userKorCoins).toLocaleString()} more KOR Coins.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !canAfford}>
              {loading ? "Loading..." : "Create Room"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
