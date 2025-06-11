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
  Search,
  Eye,
  MessageCircle,
  ThumbsUp,
  Clock,
  Pin,
  Flame,
  Plus,
  CheckCircle,
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
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { MOCK_POSTS, type Post } from "./post-data";

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

// Static configurations
// const ROW_BACKGROUNDS = {
//   pinned:
//     "bg-gradient-to-r from-blue-50/80 to-blue-100/60 dark:from-blue-950/30 dark:to-blue-900/20 border-l-4 border-l-blue-400",
//   hot: "bg-gradient-to-r from-orange-50/80 to-orange-100/60 dark:from-orange-950/30 dark:to-orange-900/20 border-l-4 border-l-orange-400",
//   default: "hover:bg-muted/50 transition-colors",
// } as const;

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const PostsList = memo(() => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<Post>[]>(
    () => [
      {
        header: "Post",
        accessorKey: "title",
        cell: ({ row }) => {
          const post = row.original;
          return (
            <div className="flex items-start gap-3 py-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  {post.isPinned && (
                    <Pin
                      className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                      aria-label="Pinned"
                    />
                  )}
                  {post.isHot && (
                    <Flame
                      className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0"
                      aria-label="Hot"
                    />
                  )}
                  <a
                    href="#"
                    className="font-semibold text-foreground hover:text-[#549BCC] cursor-pointer transition-colors line-clamp-1"
                  >
                    {post.title}
                  </a>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-1 truncate max-w-[500px] w-full">
                  {post.excerpt}
                </p>
              </div>
            </div>
          );
        },
        size: 400,
        filterFn: (row, id, value) => {
          const post = row.original;
          const searchValue = String(value).toLowerCase();
          return (
            post.title.toLowerCase().includes(searchValue) ||
            post.excerpt.toLowerCase().includes(searchValue)
          );
        },
      },
      {
        header: "Author",
        accessorKey: "author",
        cell: ({ row }) => {
          const author = row.original.author;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={author.avatar || ""} alt={author.name} />
                <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm flex items-center gap-1">
                  {author.name}
                  {author.verified && (
                    <CheckCircle
                      className="w-3.5 h-3.5 text-blue-500"
                      aria-label="Verified Author"
                    />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {author.username}
                </div>
              </div>
            </div>
          );
        },
        size: 180,
      },
      {
        header: "Views",
        accessorKey: "views",
        cell: ({ row }) => {
          const views = row.getValue("views") as number;
          const formatStat = (num: number) =>
            num > 999 ? `${(num / 1000).toFixed(1)}k` : String(num);
          return (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span className="font-medium text-foreground">
                {formatStat(views)}
              </span>
            </div>
          );
        },
        size: 100,
      },
      {
        header: "Likes",
        accessorKey: "likes",
        cell: ({ row }) => {
          const likes = row.getValue("likes") as number;
          const formatStat = (num: number) =>
            num > 999 ? `${(num / 1000).toFixed(1)}k` : String(num);
          return (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <ThumbsUp className="w-4 h-4" />
              <span className="font-medium text-foreground">
                {formatStat(likes)}
              </span>
            </div>
          );
        },
        size: 100,
      },
      {
        header: "Comments",
        accessorKey: "comments",
        cell: ({ row }) => {
          const comments = row.getValue("comments") as number;
          const formatStat = (num: number) =>
            num > 999 ? `${(num / 1000).toFixed(1)}k` : String(num);
          return (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium text-foreground">
                {formatStat(comments)}
              </span>
            </div>
          );
        },
        size: 100,
      },
      {
        header: "Created",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{row.getValue("createdAt")}</span>
          </div>
        ),
        size: 120,
      },
    ],
    []
  );

  const table = useReactTable({
    data: MOCK_POSTS,
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
    <div className="space-y-3 mt-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-semibold">Profit Bulletin Board</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="relative flex-1 w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button className="whitespace-nowrap h-10 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </div>
      </div>
      {/* Header and Controls */}

      {/* Posts Table */}
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
                    style={{
                      width:
                        header.getSize() !== 150
                          ? `${header.getSize()}px`
                          : undefined,
                    }}
                    className="h-12 px-4 font-semibold text-foreground"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className="flex h-full cursor-pointer items-center gap-2 select-none hover:text-foreground transition-colors"
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
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
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
                    "border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4 align-top">
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
                  No posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 px-2">
        <div className="flex items-center gap-3">
          <Label
            htmlFor="rows-per-page-posts"
            className="max-sm:sr-only text-sm font-medium"
          >
            Posts per page
          </Label>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger
              id="rows-per-page-posts"
              className="w-fit whitespace-nowrap h-9 text-sm"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={pageSize.toString()}
                  className="text-sm"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-muted-foreground text-sm whitespace-nowrap">
          <span className="font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <span className="hidden md:inline">
            {" "}
            (Showing {table.getRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} posts)
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
  );
});

PostsList.displayName = "PostsList";
