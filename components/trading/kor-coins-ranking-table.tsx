"use client";

import { useMemo, useState, useCallback, memo } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
  type PaginationState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Coins,
  Trophy,
  Medal,
  Award,
  Search,
  TrendingUp,
  Clock,
  Crown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

export interface KorCoinsUser {
  rank: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  coins: number;
  lastActive: string;
  weeklyGain: number;
  isOnline: boolean;
}

// Enhanced mock data with more details
export const MOCK_KOR_COINS_USERS: KorCoinsUser[] = [
  {
    rank: 1,
    user: {
      name: "Min-Jun Park",
      username: "@minjunp",
      avatar: "",
    },
    coins: 1250000,
    lastActive: "2 hours ago",
    weeklyGain: 125000,
    isOnline: true,
  },
  {
    rank: 2,
    user: {
      name: "Ji-Woo Kim",
      username: "@jiwokim",
      avatar: "",
    },
    coins: 980000,
    lastActive: "5 hours ago",
    weeklyGain: 85000,
    isOnline: false,
  },
  {
    rank: 3,
    user: {
      name: "Seo-Yeon Lee",
      username: "@seoyeon",
      avatar: "",
    },
    coins: 875000,
    lastActive: "1 day ago",
    weeklyGain: 65000,
    isOnline: false,
  },
  {
    rank: 4,
    user: {
      name: "Jae-Hyun Cho",
      username: "@jaehyun",
      avatar: "",
    },
    coins: 720000,
    lastActive: "3 hours ago",
    weeklyGain: 45000,
    isOnline: true,
  },
  {
    rank: 5,
    user: {
      name: "Ye-Jin Song",
      username: "@yejins",
      avatar: "",
    },
    coins: 695000,
    lastActive: "12 hours ago",
    weeklyGain: 38000,
    isOnline: false,
  },
  {
    rank: 6,
    user: {
      name: "Tae-Hyung Kim",
      username: "@taehyung",
      avatar: "",
    },
    coins: 580000,
    lastActive: "2 days ago",
    weeklyGain: 25000,
    isOnline: false,
  },
  {
    rank: 7,
    user: {
      name: "Hye-Jin Park",
      username: "@hyejin",
      avatar: "",
    },
    coins: 520000,
    lastActive: "6 hours ago",
    weeklyGain: 32000,
    isOnline: true,
  },
  {
    rank: 8,
    user: {
      name: "Min-Ho Lee",
      username: "@minhol",
      avatar: "",
    },
    coins: 490000,
    lastActive: "1 day ago",
    weeklyGain: 18000,
    isOnline: false,
  },
  {
    rank: 9,
    user: {
      name: "Ji-Eun Kim",
      username: "@jieun",
      avatar: "",
    },
    coins: 450000,
    lastActive: "4 hours ago",
    weeklyGain: 22000,
    isOnline: true,
  },
  {
    rank: 10,
    user: {
      name: "Sung-Min Choi",
      username: "@sungmin",
      avatar: "",
    },
    coins: 420000,
    lastActive: "8 hours ago",
    weeklyGain: 15000,
    isOnline: false,
  },
  {
    rank: 11,
    user: {
      name: "Yoo-Jin Han",
      username: "@yoojin",
      avatar: "",
    },
    coins: 380000,
    lastActive: "1 day ago",
    weeklyGain: 12000,
    isOnline: false,
  },
  {
    rank: 12,
    user: {
      name: "Joon-Ho Kang",
      username: "@joonho",
      avatar: "",
    },
    coins: 350000,
    lastActive: "3 days ago",
    weeklyGain: 8000,
    isOnline: false,
  },
  {
    rank: 13,
    user: {
      name: "Soo-Min Jung",
      username: "@soomin",
      avatar: "",
    },
    coins: 320000,
    lastActive: "5 hours ago",
    weeklyGain: 16000,
    isOnline: true,
  },
  {
    rank: 14,
    user: {
      name: "Dong-Hyun Kim",
      username: "@donghyun",
      avatar: "",
    },
    coins: 290000,
    lastActive: "2 days ago",
    weeklyGain: 5000,
    isOnline: false,
  },
  {
    rank: 15,
    user: {
      name: "Ji-Hye Shin",
      username: "@jihye",
      avatar: "",
    },
    coins: 260000,
    lastActive: "1 day ago",
    weeklyGain: 11000,
    isOnline: false,
  },
];

// Animation variants
const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: index * 0.05,
      ease: "easeOut",
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

// Static configurations
const ROW_BACKGROUNDS = {
  1: "bg-gradient-to-r from-yellow-50/80 to-amber-50/60 dark:from-yellow-950/30 dark:to-amber-950/20 border-l-4 border-l-yellow-400",
  2: "bg-gradient-to-r from-slate-50/80 to-gray-50/60 dark:from-slate-950/30 dark:to-gray-950/20 border-l-4 border-l-slate-400",
  3: "bg-gradient-to-r from-orange-50/80 to-amber-50/60 dark:from-orange-950/30 dark:to-amber-950/20 border-l-4 border-l-orange-500",
  default: "hover:bg-muted/50 transition-colors",
} as const;

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

export const KorCoinsRankingTable = memo(() => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "coins", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const getRowBackgroundClass = useCallback((rank: number) => {
    return (
      ROW_BACKGROUNDS[rank as keyof typeof ROW_BACKGROUNDS] ||
      ROW_BACKGROUNDS.default
    );
  }, []);

  const columns = useMemo<ColumnDef<KorCoinsUser>[]>(
    () => [
      {
        header: "Rank",
        accessorKey: "rank",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <RankBadge rank={row.getValue("rank")} />
          </div>
        ),
        size: 100,
      },
      {
        header: "User",
        accessorKey: "user",
        cell: ({ row }) => {
          const user = row.original.user;
          const rank = row.original.rank;
          const isOnline = row.original.isOnline;
          return (
            <div className="flex items-center gap-3 py-1">
              <div className="relative">
                <Avatar className="h-12 w-12 ring-2 ring-border">
                  <AvatarImage src={user.avatar || ""} alt={user.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold text-foreground flex items-center gap-2">
                  {user.name}
                  {rank === 1 && <Crown className="w-4 h-4 text-yellow-500" />}
                  {rank <= 3 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5">
                      Top {rank}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {user.username}
                </div>
                <OnlineIndicator isOnline={isOnline} />
              </div>
            </div>
          );
        },
        size: 300,
        filterFn: (row, id, value) => {
          const user = row.original.user;
          const searchValue = value.toLowerCase();
          return (
            user.name.toLowerCase().includes(searchValue) ||
            user.username.toLowerCase().includes(searchValue)
          );
        },
      },
      {
        header: "Kor-Coins",
        accessorKey: "coins",
        cell: ({ row }) => {
          const coins = row.getValue("coins") as number;
          const rank = row.original.rank;

          return (
            <div className="flex items-center gap-2">
              <Coins
                className={cn(
                  "w-5 h-5",
                  rank === 1
                    ? "text-yellow-500"
                    : rank === 2
                    ? "text-slate-400"
                    : rank === 3
                    ? "text-orange-500"
                    : "text-cyan-500"
                )}
              />
              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-bold",
                    rank === 1
                      ? "text-lg text-yellow-600 dark:text-yellow-400"
                      : rank === 2
                      ? "text-base text-slate-600 dark:text-slate-400"
                      : rank === 3
                      ? "text-base text-orange-600 dark:text-orange-400"
                      : "text-foreground"
                  )}
                >
                  {new Intl.NumberFormat("en-US").format(coins)}
                </span>
                {rank <= 10 && (
                  <span className="text-xs text-muted-foreground">
                    +
                    {new Intl.NumberFormat("en-US").format(
                      row.original.weeklyGain
                    )}{" "}
                    this week
                  </span>
                )}
              </div>
            </div>
          );
        },
        size: 200,
      },
      {
        header: "Weekly Gain",
        accessorKey: "weeklyGain",
        cell: ({ row }) => {
          const gain = row.getValue("weeklyGain") as number;
          return (
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                +{new Intl.NumberFormat("en-US").format(gain)}
              </span>
            </div>
          );
        },
        size: 150,
      },
      {
        header: "Last Active",
        accessorKey: "lastActive",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {row.getValue("lastActive")}
            </span>
          </div>
        ),
        size: 140,
      },
    ],
    []
  );

  const table = useReactTable({
    data: MOCK_KOR_COINS_USERS,
    columns,
    state: {
      sorting,
      pagination,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSortingRemoval: false,
    globalFilterFn: "includesString",
  });

  const handlePageSizeChange = useCallback(
    (value: string) => {
      table.setPageSize(Number(value));
    },
    [table]
  );

  const handleFirstPage = useCallback(() => table.firstPage(), [table]);
  const handlePreviousPage = useCallback(() => table.previousPage(), [table]);
  const handleNextPage = useCallback(() => table.nextPage(), [table]);
  const handleLastPage = useCallback(() => table.lastPage(), [table]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold">Full Rankings</h2>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
      </div>

      <div className="bg-background overflow-hidden rounded-xl border shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-b bg-muted/30"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="h-12 font-semibold text-foreground"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          "flex h-full cursor-pointer items-center gap-2 select-none hover:text-foreground transition-colors",
                          header.index === 0
                            ? "justify-center"
                            : "justify-start"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ChevronUpIcon
                              className="shrink-0 opacity-60"
                              size={16}
                            />
                          ),
                          desc: (
                            <ChevronDownIcon
                              className="shrink-0 opacity-60"
                              size={16}
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          header.index === 0 ? "text-center" : "text-left"
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <motion.tr
                  key={row.id}
                  custom={index}
                  variants={tableRowVariants}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "border-b last:border-b-0",
                    getRowBackgroundClass(row.original.rank)
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 px-2 md:flex-row md:items-center md:justify-between">
        <div className="hidden sm:flex items-center gap-3">
          <Label
            htmlFor="rows-per-page-korcoins"
            className="max-sm:sr-only text-sm font-medium"
          >
            Rows per page
          </Label>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger
              id="rows-per-page-korcoins"
              className="w-fit whitespace-nowrap h-9"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-center gap-4 w-full md:flex-row md:justify-end md:w-auto md:items-center">
          <div className="text-muted-foreground text-sm whitespace-nowrap">
            <span className="font-medium">
              Showing {table.getRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} users
            </span>
          </div>

          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-9 w-9 disabled:pointer-events-none disabled:opacity-50"
                    onClick={handleFirstPage}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Go to first page"
                  >
                    <ChevronFirstIcon size={16} />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-9 w-9 disabled:pointer-events-none disabled:opacity-50"
                    onClick={handlePreviousPage}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Go to previous page"
                  >
                    <ChevronLeftIcon size={16} />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-9 w-9 disabled:pointer-events-none disabled:opacity-50"
                    onClick={handleNextPage}
                    disabled={!table.getCanNextPage()}
                    aria-label="Go to next page"
                  >
                    <ChevronRightIcon size={16} />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-9 w-9 disabled:pointer-events-none disabled:opacity-50"
                    onClick={handleLastPage}
                    disabled={!table.getCanNextPage()}
                    aria-label="Go to last page"
                  >
                    <ChevronLastIcon size={16} />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
});

KorCoinsRankingTable.displayName = "KorCoinsRankingTable";
