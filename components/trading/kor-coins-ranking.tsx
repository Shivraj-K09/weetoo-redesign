"use client";

import { memo, useMemo } from "react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Clock,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  KorCoinsRankingTable,
  MOCK_KOR_COINS_USERS,
} from "./kor-coins-ranking-table";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: index * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Memoized components
const RankBadge = memo(({ rank }: { rank: number }) => {
  const getBadgeConfig = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          icon: Trophy,
          className:
            "border-2 border-yellow-400 text-yellow-600 dark:text-yellow-400 bg-transparent font-bold px-3 py-1.5",
          iconColor: "text-yellow-600 dark:text-yellow-400",
        };
      case 2:
        return {
          icon: Medal,
          className:
            "border-2 border-slate-400 text-slate-600 dark:text-slate-400 bg-transparent font-bold px-3 py-1.5",
          iconColor: "text-slate-600 dark:text-slate-400",
        };
      case 3:
        return {
          icon: Award,
          className:
            "border-2 border-orange-500 text-orange-600 dark:text-orange-400 bg-transparent font-bold px-3 py-1.5",
          iconColor: "text-orange-600 dark:text-orange-400",
        };
      default:
        return null;
    }
  };

  const config = getBadgeConfig(rank);

  if (!config) {
    return (
      <div className="w-12 text-center">
        <span className="font-semibold text-muted-foreground">#{rank}</span>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <Badge className={`font-bold px-3 py-1.5 ${config.className}`}>
      <Icon className={`w-3.5 h-3.5 mr-1.5 ${config.iconColor}`} />#{rank}
    </Badge>
  );
});
RankBadge.displayName = "RankBadge";

const OnlineIndicator = memo(({ isOnline }: { isOnline: boolean }) => (
  <div className="flex items-center gap-1.5">
    <div
      className={cn(
        "w-2 h-2 rounded-full",
        isOnline ? "bg-green-500 animate-pulse" : "bg-gray-400 dark:bg-gray-600"
      )}
    />
    <span
      className={cn(
        "text-xs",
        isOnline
          ? "text-green-600 dark:text-green-400"
          : "text-muted-foreground"
      )}
    >
      {isOnline ? "Online" : "Offline"}
    </span>
  </div>
));
OnlineIndicator.displayName = "OnlineIndicator";

export const KorCoinsRanking = memo(() => {
  // Top 3 users for the leaderboard cards - reordered for display (2nd, 1st, 3rd)
  const topUsers = useMemo(() => {
    const [first, second, third] = MOCK_KOR_COINS_USERS.slice(0, 3);
    return [second, first, third]; // Rearrange: 2nd place, 1st place, 3rd place
  }, []);

  return (
    <div className="space-y-5">
      {/* Top 3 Leaderboard */}
      <div
        className="relative min-h-[350px] flex items-center justify-center gap-12 px-8"
        style={{ perspective: "1200px" }}
      >
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {topUsers.map((user, index) => (
            <motion.div
              key={user.rank}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className={cn(
                "flex-1 rounded-xl border p-6 shadow-lg transition-all duration-200 hover:shadow-xl relative overflow-hidden",
                user.rank === 1
                  ? "bg-gradient-to-br from-yellow-50/80 to-yellow-100/50 dark:from-yellow-950/40 dark:to-yellow-900/20 border-yellow-200 dark:border-yellow-800"
                  : user.rank === 2
                  ? "bg-gradient-to-br from-slate-50/80 to-slate-100/50 dark:from-slate-950/40 dark:to-slate-900/20 border-slate-200 dark:border-slate-800"
                  : "bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-950/40 dark:to-orange-900/20 border-orange-200 dark:border-orange-800"
              )}
              style={{
                transform: `rotateY(${
                  user.rank === 2
                    ? "12deg"
                    : user.rank === 3
                    ? "-12deg"
                    : "0deg"
                }) translateZ(${
                  user.rank === 1 ? "0px" : user.rank === 2 ? "-80px" : "-120px"
                }) translateY(${
                  user.rank === 1 ? "-20px" : user.rank === 2 ? "38px" : "50px"
                }) scale(${
                  user.rank === 1 ? "1" : user.rank === 2 ? "0.9" : "0.85"
                })`,
              }}
            >
              {/* Decorative background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <Coins className="w-full h-full" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <RankBadge rank={user.rank} />
                  <div className="flex items-center gap-2">
                    <Coins
                      className={cn(
                        "w-5 h-5",
                        user.rank === 1
                          ? "text-yellow-500"
                          : user.rank === 2
                          ? "text-slate-400"
                          : "text-orange-500"
                      )}
                    />
                    <span
                      className={cn(
                        "font-bold text-lg",
                        user.rank === 1
                          ? "text-yellow-600 dark:text-yellow-400"
                          : user.rank === 2
                          ? "text-slate-600 dark:text-slate-400"
                          : "text-orange-600 dark:text-orange-400"
                      )}
                    >
                      {new Intl.NumberFormat("en-US").format(user.coins)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 ring-2 ring-border">
                      <AvatarImage
                        src={user.user.avatar || ""}
                        alt={user.user.name}
                      />
                      <AvatarFallback className="bg-muted text-muted-foreground text-xl font-medium">
                        {user.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {user.user.name}
                      {user.rank === 1 && (
                        <Crown className="w-5 h-5 text-yellow-500" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {user.user.username}
                    </p>
                    <OnlineIndicator isOnline={user.isOnline} />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Weekly Gain
                    </span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      +{new Intl.NumberFormat("en-US").format(user.weeklyGain)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Last Active
                    </span>
                    <span className="text-sm">{user.lastActive}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard Table Section */}
      <div className="">
        <KorCoinsRankingTable />
      </div>
    </div>
  );
});

KorCoinsRanking.displayName = "KorCoinsRanking";
