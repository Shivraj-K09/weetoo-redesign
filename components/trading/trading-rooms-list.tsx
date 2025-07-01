"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleXIcon,
  ClockIcon,
  Columns3Icon,
  Crown,
  DoorOpenIcon,
  FilterIcon,
  GlobeIcon,
  ListFilterIcon,
  LockIcon,
  MessageSquareIcon,
  MicIcon,
  UsersIcon,
} from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CreateRoom } from "./create-room";
import { TradingRoomWindow } from "./room-window";

// Types
interface TradingRoom {
  id: string;
  name: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  symbol: string;
  category: "regular" | "voice";
  createdAt: string;
  isPublic: boolean;
  isHosted: boolean;
  participants: number;
  pnlPercentage?: number;
}

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<TradingRoom> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.symbol} ${row.original.creator.name}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const categoryFilterFn: FilterFn<TradingRoom> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const category = row.getValue(columnId) as string;
  return filterValue.includes(category);
};

const accessFilterFn: FilterFn<TradingRoom> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const isPublic = row.getValue(columnId) as boolean;
  return filterValue.includes(isPublic ? "public" : "private");
};

// Mock data
const mockTradingRooms: TradingRoom[] = [
  {
    id: "1",
    name: "BTC Strategy Discussion",
    creator: {
      id: "user1",
      name: "Alex Thompson",
      avatar: "",
    },
    symbol: "BTC/USDT",
    category: "regular",
    createdAt: "2h ago",
    isPublic: true,
    isHosted: true,
    participants: 24,
    pnlPercentage: 5.2,
  },
  {
    id: "2",
    name: "ETH Technical Analysis",
    creator: {
      id: "user2",
      name: "Sarah Kim",
      avatar: "",
    },
    symbol: "ETH/USDT",
    category: "voice",
    createdAt: "3h ago",
    isPublic: true,
    isHosted: false,
    participants: 18,
    pnlPercentage: -2.1,
  },
  {
    id: "3",
    name: "Private Altcoin Signals",
    creator: {
      id: "user3",
      name: "Michael Chen",
      avatar: "",
    },
    symbol: "SOL/USDT",
    category: "regular",
    createdAt: "5h ago",
    isPublic: false,
    isHosted: false,
    participants: 7,
    pnlPercentage: 0.0,
  },
  {
    id: "4",
    name: "Korean Market Analysis",
    creator: {
      id: "user4",
      name: "Ji-Hoon Park",
      avatar: "",
    },
    symbol: "XRP/KRW",
    category: "voice",
    createdAt: "6h ago",
    isPublic: true,
    isHosted: false,
    participants: 32,
    pnlPercentage: 1.7,
  },
  {
    id: "5",
    name: "Futures Trading Strategies",
    creator: {
      id: "user5",
      name: "Emma Wilson",
      avatar: "",
    },
    symbol: "BTC/USDT",
    category: "regular",
    createdAt: "8h ago",
    isPublic: true,
    isHosted: false,
    participants: 15,
    pnlPercentage: -3.4,
  },
  {
    id: "6",
    name: "VIP Trading Signals",
    creator: {
      id: "user6",
      name: "David Lee",
      avatar: "",
    },
    symbol: "DOGE/USDT",
    category: "voice",
    createdAt: "10h ago",
    isPublic: false,
    isHosted: true,
    participants: 9,
    pnlPercentage: 2.9,
  },
  {
    id: "7",
    name: "Beginner's Trading Circle",
    creator: {
      id: "user7",
      name: "Sophia Garcia",
      avatar: "",
    },
    symbol: "ADA/USDT",
    category: "regular",
    createdAt: "12h ago",
    isPublic: true,
    isHosted: false,
    participants: 41,
    pnlPercentage: 0.8,
  },
  {
    id: "8",
    name: "Institutional Trading",
    creator: {
      id: "user8",
      name: "Robert Johnson",
      avatar: "",
    },
    symbol: "ETH/BTC",
    category: "voice",
    createdAt: "1d ago",
    isPublic: false,
    isHosted: false,
    participants: 5,
    pnlPercentage: -1.2,
  },
  {
    id: "9",
    name: "Swing Trading Group",
    creator: {
      id: "user9",
      name: "Olivia Brown",
      avatar: "",
    },
    symbol: "LINK/USDT",
    category: "regular",
    createdAt: "1d ago",
    isPublic: true,
    isHosted: false,
    participants: 27,
    pnlPercentage: 4.5,
  },
  {
    id: "10",
    name: "Day Trading Strategies",
    creator: {
      id: "user10",
      name: "William Taylor",
      avatar: "",
    },
    symbol: "BNB/USDT",
    category: "voice",
    createdAt: "2d ago",
    isPublic: true,
    isHosted: false,
    participants: 19,
    pnlPercentage: -0.7,
  },
  {
    id: "11",
    name: "Options Trading Talk",
    creator: {
      id: "user11",
      name: "Nina Patel",
      avatar: "",
    },
    symbol: "BTC/USDT",
    category: "voice",
    createdAt: "3d ago",
    isPublic: true,
    isHosted: true,
    participants: 11,
    pnlPercentage: 3.1,
  },
  {
    id: "12",
    name: "Scalping Tactics",
    creator: {
      id: "user12",
      name: "Ethan Wright",
      avatar: "",
    },
    symbol: "ETH/USDT",
    category: "regular",
    createdAt: "2d ago",
    isPublic: false,
    isHosted: false,
    participants: 14,
    pnlPercentage: -2.8,
  },
  {
    id: "13",
    name: "High Frequency Traders",
    creator: {
      id: "user13",
      name: "Liam Martin",
      avatar: "",
    },
    symbol: "BTC/USD",
    category: "voice",
    createdAt: "4d ago",
    isPublic: false,
    isHosted: true,
    participants: 6,
    pnlPercentage: 1.2,
  },
  {
    id: "14",
    name: "Crypto Arbitrage",
    creator: {
      id: "user14",
      name: "Amelia Evans",
      avatar: "",
    },
    symbol: "USDT/USD",
    category: "regular",
    createdAt: "5d ago",
    isPublic: true,
    isHosted: false,
    participants: 8,
    pnlPercentage: 2.3,
  },
  {
    id: "15",
    name: "DeFi Farming Discussion",
    creator: {
      id: "user15",
      name: "Carlos Diaz",
      avatar: "",
    },
    symbol: "UNI/USDT",
    category: "regular",
    createdAt: "6d ago",
    isPublic: true,
    isHosted: false,
    participants: 17,
    pnlPercentage: -1.9,
  },
  {
    id: "16",
    name: "Korean Whale Watch",
    creator: {
      id: "user16",
      name: "Min-Jae Lee",
      avatar: "",
    },
    symbol: "XRP/KRW",
    category: "voice",
    createdAt: "1w ago",
    isPublic: false,
    isHosted: false,
    participants: 12,
    pnlPercentage: 0.6,
  },
  {
    id: "17",
    name: "Morning Crypto Brief",
    creator: {
      id: "user17",
      name: "Grace Hall",
      avatar: "",
    },
    symbol: "ETH/USD",
    category: "regular",
    createdAt: "1w ago",
    isPublic: true,
    isHosted: true,
    participants: 21,
    pnlPercentage: 5.0,
  },
  {
    id: "18",
    name: "Asia Market Movers",
    creator: {
      id: "user18",
      name: "Kenji Yamamoto",
      avatar: "",
    },
    symbol: "BTC/JPY",
    category: "voice",
    createdAt: "1w ago",
    isPublic: true,
    isHosted: false,
    participants: 23,
    pnlPercentage: -4.2,
  },
  {
    id: "19",
    name: "Altcoin Daily Wrap",
    creator: {
      id: "user19",
      name: "Isla Moore",
      avatar: "",
    },
    symbol: "AVAX/USDT",
    category: "regular",
    createdAt: "2w ago",
    isPublic: false,
    isHosted: true,
    participants: 10,
    pnlPercentage: 3.7,
  },
  {
    id: "20",
    name: "Community Token Picks",
    creator: {
      id: "user20",
      name: "Daniel Green",
      avatar: "",
    },
    symbol: "MATIC/USDT",
    category: "voice",
    createdAt: "2w ago",
    isPublic: true,
    isHosted: false,
    participants: 26,
    pnlPercentage: -0.5,
  },
];

export function TradingRoomsList() {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const [openWindow, setOpenWindow] = useState<{
    isOpen: boolean;
    roomName: string;
    roomData?: TradingRoom;
  }>({
    isOpen: false,
    roomName: "",
  });

  const columns = useMemo<ColumnDef<TradingRoom>[]>(
    () => [
      {
        header: "Room",
        accessorKey: "name",
        cell: ({ row }) => {
          const room = row.original;
          return (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium">{room.name}</span>
                {room.isHosted && (
                  <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">
                    <Crown className="h-3 w-3 mr-1" />
                    Host
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {room.symbol}
              </span>
            </div>
          );
        },
        size: 260,
        filterFn: multiColumnFilterFn,
        enableHiding: false,
      },
      {
        header: "Creator",
        accessorKey: "creator",
        cell: ({ row }) => {
          const creator = row.original.creator;
          return (
            <div className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  {creator.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{creator.name}</span>
            </div>
          );
        },
        size: 180,
      },
      {
        header: "P&L %",
        accessorKey: "pnlPercentage",
        cell: ({ row }) => {
          const pnl = row.original.pnlPercentage;
          return (
            <span
              className={cn(
                "font-medium",
                pnl === undefined
                  ? "text-muted-foreground"
                  : pnl > 0
                  ? "text-green-500"
                  : pnl < 0
                  ? "text-red-500"
                  : "text-muted-foreground"
              )}
            >
              {pnl !== undefined
                ? `${pnl > 0 ? "+" : ""}${pnl.toFixed(2)}%`
                : "-"}
            </span>
          );
        },
        size: 90,
      },
      {
        header: "Participants",
        accessorKey: "participants",
        cell: ({ row }) => {
          const room = row.original;
          return (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{room.participants}</span>
              </div>
            </div>
          );
        },
        size: 120,
      },
      {
        header: "Type",
        accessorKey: "category",
        cell: ({ row }) => {
          const category = row.getValue("category") as string;
          return (
            <Badge
              variant="outline"
              className={cn(
                "font-normal",
                category === "voice"
                  ? "border-blue-200 dark:border-blue-800"
                  : "border-emerald-200 dark:border-emerald-800"
              )}
            >
              {category === "voice" ? (
                <MicIcon className="h-3 w-3 mr-1 text-blue-500" />
              ) : (
                <MessageSquareIcon className="h-3 w-3 mr-1 text-emerald-500" />
              )}
              {category === "voice" ? "Voice" : "Chat"}
            </Badge>
          );
        },
        size: 100,
        filterFn: categoryFilterFn,
      },
      {
        header: "Access",
        accessorKey: "isPublic",
        cell: ({ row }) => {
          const isPublic = row.getValue("isPublic") as boolean;
          return (
            <Badge
              variant="outline"
              className={cn(
                "font-normal",
                isPublic
                  ? "border-slate-200 dark:border-slate-700"
                  : "border-slate-300 dark:border-slate-600"
              )}
            >
              {isPublic ? (
                <GlobeIcon className="h-3 w-3 mr-1 text-slate-500" />
              ) : (
                <LockIcon className="h-3 w-3 mr-1 text-slate-500" />
              )}
              {isPublic ? "Public" : "Private"}
            </Badge>
          );
        },
        size: 100,
        filterFn: accessFilterFn,
      },
      {
        header: "Created",
        accessorKey: "createdAt",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <ClockIcon className="h-3.5 w-3.5" />
              {row.getValue("createdAt")}
            </div>
          );
        },
        size: 140,
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <div className="flex justify-end pr-4">
            <Button
              size="sm"
              className="px-4 h-9 font-medium cursor-pointer"
              onClick={() =>
                setOpenWindow({
                  isOpen: true,
                  roomName: row.original.name,
                  roomData: row.original,
                })
              }
            >
              <DoorOpenIcon />
              Join Room
            </Button>
          </div>
        ),
        size: 120,
        enableHiding: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: mockTradingRooms,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  // Get unique category values
  const uniqueCategoryValues = useMemo(() => {
    const categoryColumn = table.getColumn("category");
    if (!categoryColumn) return [];
    const values = Array.from(categoryColumn.getFacetedUniqueValues().keys());
    return values.sort();
  }, [table.getColumn("category")?.getFacetedUniqueValues()]);

  // Get counts for each category
  const categoryCounts = useMemo(() => {
    const categoryColumn = table.getColumn("category");
    if (!categoryColumn) return new Map();
    return categoryColumn.getFacetedUniqueValues();
  }, [table.getColumn("category")?.getFacetedUniqueValues()]);

  const selectedCategories = useMemo(() => {
    const filterValue = table
      .getColumn("category")
      ?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("category")?.getFilterValue()]);

  const handleCategoryChange = (checked: boolean, value: string) => {
    const filterValue = table
      .getColumn("category")
      ?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn("category")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  // Access type filter options
  const accessOptions = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
  ];

  const selectedAccess = useMemo(() => {
    const filterValue = table
      .getColumn("isPublic")
      ?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("isPublic")?.getFilterValue()]);

  const handleAccessChange = (checked: boolean, value: string) => {
    const filterValue = table
      .getColumn("isPublic")
      ?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn("isPublic")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Filter by name or symbol */}
          <div className="relative flex-1 w-full sm:w-auto">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer w-full sm:w-[300px] ps-9",
                Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9"
              )}
              value={
                (table.getColumn("name")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              placeholder="Filter by name, symbol, or creator..."
              type="text"
              aria-label="Filter by name, symbol, or creator"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn("name")?.getFilterValue()) && (
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("name")?.setFilterValue("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <CircleXIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Filter by type */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-36 cursor-pointer"
              >
                <FilterIcon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Type
                {selectedCategories.length > 0 && (
                  <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-36 p-3" align="start">
              <div className="space-y-3">
                <div className="text-muted-foreground text-xs font-medium">
                  Filters
                </div>
                <div className="space-y-3">
                  {uniqueCategoryValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-category-${i}`}
                        checked={selectedCategories.includes(value)}
                        onCheckedChange={(checked: boolean) =>
                          handleCategoryChange(checked, value)
                        }
                      />
                      <Label
                        htmlFor={`${id}-category-${i}`}
                        className="flex grow justify-between gap-2 font-normal"
                      >
                        {value === "voice" ? "Voice" : "Chat"}{" "}
                        <span className="text-muted-foreground ms-2 text-xs">
                          {categoryCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Filter by access */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-36 cursor-pointer"
              >
                <FilterIcon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Access
                {selectedAccess.length > 0 && (
                  <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {selectedAccess.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-36 p-3" align="start">
              <div className="space-y-3">
                <div className="text-muted-foreground text-xs font-medium">
                  Filters
                </div>
                <div className="space-y-3">
                  {accessOptions.map((option, i) => (
                    <div key={option.value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-access-${i}`}
                        checked={selectedAccess.includes(option.value)}
                        onCheckedChange={(checked: boolean) =>
                          handleAccessChange(checked, option.value)
                        }
                      />
                      <Label
                        htmlFor={`${id}-access-${i}`}
                        className="flex grow justify-between gap-2 font-normal"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-32 cursor-pointer"
              >
                <Columns3Icon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto mt-3 sm:mt-0">
          {/* Create room button */}
          <CreateRoom />
        </div>
      </div>

      {/* Table */}
      <div className="bg-background overflow-x-auto rounded-md border">
        <Table className="table-fixed min-w-[800px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
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
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="h-16">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-5 py-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No trading rooms found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page number information */}
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0
                ),
                table.getRowCount()
              )}
            </span>{" "}
            of{" "}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <TradingRoomWindow
        roomName={openWindow.roomName}
        isPublic={openWindow.roomData?.isPublic ?? true}
        isOpen={openWindow.isOpen}
        onClose={() => setOpenWindow({ isOpen: false, roomName: "" })}
      />
    </div>
  );
}
