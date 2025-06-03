"use client";

import { Fragment, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Exchange = {
  id: string;
  name: string;
  logo: string;
  logoColor: string;
  website: string;
  paybackRate: number;
  tradingDiscount: string;
  limitOrderFee: string;
  marketOrderFee: string;
  event: string;
  description?: string;
  features?: string[];
};

const EXCHANGES: Exchange[] = [
  {
    id: "binance",
    name: "Binance",
    logo: "B",
    logoColor: "#F0B90B",
    website: "binance.com",
    paybackRate: 35,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description:
      "바이낸스는 세계 최대 규모의 암호화폐 거래소로, 다양한 암호화폐와 거래 옵션을 제공합니다.",
    features: [
      "전세계 비트코인 거래량 순위 6위 대형 거래소",
      "한국 금융 서비스에 등록 거래소",
      "안정적인 레버리지 관리 보장제도",
    ],
  },
  {
    id: "bitget",
    name: "Bitget",
    logo: "B",
    logoColor: "#00D4AA",
    website: "bitget.com",
    paybackRate: 55,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description:
      "비트겟은 글로벌 암호화폐 거래소로 선물거래와 카피트레이딩 서비스를 제공합니다.",
    features: [
      "높은 페이백률과 다양한 이벤트",
      "카피트레이딩 기능 제공",
      "다양한 암호화폐 지원",
    ],
  },
  {
    id: "okx",
    name: "OKX",
    logo: "O",
    logoColor: "#FF6B35",
    website: "okx.com",
    paybackRate: 55,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description:
      "OKX는 세계적인 암호화폐 거래소로 현물, 선물, 옵션 거래를 지원합니다.",
    features: [
      "안정적인 플랫폼과 다양한 거래 도구",
      "다양한 금융 상품 제공",
      "글로벌 사용자 기반",
    ],
  },
  {
    id: "bybit",
    name: "Bybit",
    logo: "B",
    logoColor: "#F7931A",
    website: "bybit.com",
    paybackRate: 40,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description: "바이비트는 암호화폐 파생상품 거래에 특화된 거래소입니다.",
    features: [
      "높은 레버리지와 빠른 체결 속도",
      "다양한 선물 거래 옵션",
      "사용자 친화적인 인터페이스",
    ],
  },
  {
    id: "xtcom",
    name: "XT.com",
    logo: "X",
    logoColor: "#1DD1A1",
    website: "xt.com",
    paybackRate: 70,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description:
      "XT.com은 글로벌 디지털 자산 거래 플랫폼으로 다양한 암호화폐 거래 서비스를 제공합니다.",
    features: [
      "높은 페이백 혜택",
      "다양한 알트코인 지원",
      "글로벌 서비스 제공",
    ],
  },
  {
    id: "bingx",
    name: "BingX",
    logo: "B",
    logoColor: "#FFD93D",
    website: "bingx.com",
    paybackRate: 65,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description:
      "빙엑스는 소셜 트레이딩과 카피 트레이딩 기능을 제공하는 혁신적인 암호화폐 거래소입니다.",
    features: ["소셜 트레이딩 기능", "높은 페이백 혜택", "다양한 거래 도구"],
  },
  {
    id: "deepcoin",
    name: "DeepCoin",
    logo: "D",
    logoColor: "#8B5CF6",
    website: "deepcoin.com",
    paybackRate: 70,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description:
      "딥코인은 전문적인 암호화폐 거래 서비스를 제공하는 글로벌 디지털 자산 거래소입니다.",
    features: ["높은 페이백률", "안정적인 거래 시스템", "다양한 암호화폐 지원"],
  },
  {
    id: "tapbit",
    name: "Tapbit",
    logo: "T",
    logoColor: "#F59E0B",
    website: "tapbit.com",
    paybackRate: 70,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description:
      "탭비트는 사용자 친화적인 인터페이스와 다양한 거래 옵션을 제공하는 암호화폐 거래소입니다.",
    features: [
      "사용자 친화적 인터페이스",
      "높은 페이백 혜택",
      "다양한 거래 옵션",
    ],
  },
  {
    id: "hotcoin",
    name: "HotCoin",
    logo: "H",
    logoColor: "#EF4444",
    website: "hotcoin.com",
    paybackRate: 80,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description:
      "핫코인은 높은 페이백률과 다양한 이벤트를 제공하는 글로벌 암호화폐 거래소입니다.",
    features: [
      "최고 수준의 페이백률",
      "다양한 프로모션 이벤트",
      "안정적인 거래 시스템",
    ],
  },
  {
    id: "coinex",
    name: "CoinEx",
    logo: "C",
    logoColor: "#F59E0B",
    website: "coinex.com",
    paybackRate: 60,
    tradingDiscount: "-",
    limitOrderFee: "0.024%",
    marketOrderFee: "0.045%",
    event: "입금 20% 크레딧",
    description:
      "코인엑스는 안정적이고 신뢰할 수 있는 암호화폐 거래 서비스를 제공하는 글로벌 거래소입니다.",
    features: [
      "안정적인 거래 플랫폼",
      "다양한 암호화폐 지원",
      "글로벌 서비스 제공",
    ],
  },
];

const columns: ColumnDef<Exchange>[] = [
  {
    header: "거래소",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {row.getCanExpand() && (
          <Button
            className="size-7 shadow-none text-muted-foreground"
            onClick={(e) => {
              e.stopPropagation();
              row.getToggleExpandedHandler()();
            }}
            aria-expanded={row.getIsExpanded()}
            aria-label={row.getIsExpanded() ? `접기` : `펼치기`}
            size="icon"
            variant="ghost"
          >
            <ChevronDownIcon
              className="transition-transform duration-200"
              style={{
                transform: row.getIsExpanded()
                  ? "rotate(-180deg)"
                  : "rotate(0deg)",
              }}
              size={16}
              aria-hidden="true"
            />
          </Button>
        )}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: row.original.logoColor }}
        >
          {row.original.logo}
        </div>
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    header: () => <div className="text-center">페이백%</div>,
    accessorKey: "paybackRate",
    cell: ({ row }) => (
      <div className="text-center">
        <span className="inline-block bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
          {row.getValue("paybackRate")}% 페이백
        </span>
      </div>
    ),
  },
  {
    header: () => <div className="text-center">거래 할인%</div>,
    accessorKey: "tradingDiscount",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("tradingDiscount")}</div>
    ),
  },
  {
    header: () => <div className="text-center">지정가%</div>,
    accessorKey: "limitOrderFee",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("limitOrderFee")}</div>
    ),
  },
  {
    header: () => <div className="text-center">시장가%</div>,
    accessorKey: "marketOrderFee",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("marketOrderFee")}</div>
    ),
  },
  {
    header: () => <div className="text-center">이벤트</div>,
    accessorKey: "event",
    cell: ({ row }) => (
      <div className="text-center flex items-center justify-center gap-2">
        <Badge
          variant="outline"
          className="border-red-200 text-red-600 dark:border-red-800 dark:text-red-400"
        >
          {row.getValue("event")}
        </Badge>
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0" asChild>
          <a
            href={`https://${row.original.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </Button>
      </div>
    ),
  },
];

export const CoinFuturesComparison = () => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const table = useReactTable({
    data: EXCHANGES,
    columns,
    getRowCanExpand: (row) => Boolean(row.original.description),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="w-full">
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-b border-border"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-transparent border-r border-border last:border-r-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    key={row.id}
                    className="cursor-pointer border-b border-border"
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => row.toggleExpanded()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="whitespace-nowrap border-r border-border last:border-r-0"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <AnimatePresence>
                    {row.getIsExpanded() && (
                      <tr>
                        <td
                          colSpan={row.getVisibleCells().length}
                          className="p-0 border-0"
                        >
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden border-b border-border"
                          >
                            <div className="p-6 bg-muted/30">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">
                                    {row.original.name} 상세 정보
                                  </h4>
                                  <p className="text-sm mb-4">
                                    {row.original.description}
                                  </p>
                                  <div className="space-y-2">
                                    {row.original.features?.map(
                                      (feature, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center gap-2"
                                        >
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <span className="text-sm">
                                            {feature}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col justify-center items-end">
                                  <div className="space-y-3 w-full max-w-xs">
                                    <Button
                                      variant="outline"
                                      className="w-full"
                                    >
                                      간편 UID 등록
                                    </Button>
                                    <Button
                                      className="w-full bg-red-500 hover:bg-red-600 text-white"
                                      asChild
                                    >
                                      <a
                                        href={`https://${row.original.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        가입하기{" "}
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
