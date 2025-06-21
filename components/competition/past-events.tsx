"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const pastEvents = [
  {
    symbol: "🏅",
    name: "Spring Stock Showdown",
    description: "A fierce battle in the spring markets.",
    date: "2024-03-01 to 2024-03-31",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "🦾",
    name: "AI Trading Cup",
    description: "Algorithmic traders went head to head.",
    date: "2024-02-10 to 2024-02-20",
    time: "24/7",
    status: "Completed",
  },
  {
    symbol: "🌟",
    name: "Star Investors League",
    description: "Top investors competed for the star title.",
    date: "2023-12-01 to 2023-12-31",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "💰",
    name: "Big Gains Bonanza",
    description: "Who made the biggest gains this fall?",
    date: "2023-10-01 to 2023-10-15",
    time: "Market Hours",
    status: "Completed",
  },
  {
    symbol: "📊",
    name: "ETF Autumn Clash",
    description: "ETF traders battled for the top spot.",
    date: "2023-09-10 to 2023-09-20",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "🪙",
    name: "Crypto Winter Classic",
    description: "Surviving the toughest crypto season.",
    date: "2023-08-01 to 2023-08-31",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "📈",
    name: "Growth Gurus",
    description: "Who grew their portfolio the most?",
    date: "2023-07-01 to 2023-07-15",
    time: "Market Hours",
    status: "Completed",
  },
  {
    symbol: "🏆",
    name: "Summer Trading Tournament",
    description: "A hot contest in the summer markets.",
    date: "2023-06-10 to 2023-06-30",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "🧠",
    name: "Smart Money Masters",
    description: "Who made the smartest moves?",
    date: "2023-05-01 to 2023-05-20",
    time: "Market Hours",
    status: "Completed",
  },
  {
    symbol: "💹",
    name: "Forex Frenzy",
    description: "Currency traders in a global battle.",
    date: "2023-04-01 to 2023-04-15",
    time: "24/5",
    status: "Completed",
  },
  {
    symbol: "🔮",
    name: "Futures Forecast",
    description: "Who predicted the markets best?",
    date: "2023-03-10 to 2023-03-25",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "🥈",
    name: "Silver Bulls Bash",
    description: "A contest for the silver bulls.",
    date: "2023-02-01 to 2023-02-14",
    time: "Market Hours",
    status: "Completed",
  },
  {
    symbol: "🥉",
    name: "Bronze Bears Battle",
    description: "Who survived the bear market?",
    date: "2023-01-10 to 2023-01-25",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "🛢️",
    name: "Commodities Clash",
    description: "Oil, gold, and more in this commodities event.",
    date: "2022-12-01 to 2022-12-15",
    time: "Market Hours",
    status: "Completed",
  },
  {
    symbol: "🏠",
    name: "REIT Rumble",
    description: "Real estate investment trust showdown.",
    date: "2022-11-01 to 2022-11-20",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "🧊",
    name: "Winter Wealth War",
    description: "Who kept their cool in the cold markets?",
    date: "2022-10-01 to 2022-10-31",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "🌾",
    name: "Harvest Hedge",
    description: "A contest for the best hedging strategies.",
    date: "2022-09-10 to 2022-09-25",
    time: "Market Hours",
    status: "Completed",
  },
  {
    symbol: "🦅",
    name: "Eagle Eye Investors",
    description: "Spotting the best opportunities.",
    date: "2022-08-01 to 2022-08-15",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "🦄",
    name: "Unicorn Fund Finals",
    description: "Who found the next unicorn?",
    date: "2022-07-01 to 2022-07-20",
    time: "Market Hours",
    status: "Completed",
  },
  {
    symbol: "🦈",
    name: "Shark Tank Traders",
    description: "A fierce trading competition for the bold.",
    date: "2022-06-01 to 2022-06-15",
    time: "All Day",
    status: "Completed",
  },
  {
    symbol: "🧲",
    name: "Magnet Market Masters",
    description: "Who attracted the most gains?",
    date: "2022-05-01 to 2022-05-10",
    time: "Market Hours",
    status: "Completed",
  },
];

const ITEMS_PER_PAGE = 12;

export function PastEvents() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(pastEvents.length / ITEMS_PER_PAGE);
  const currentEvents = pastEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentEvents.map((event) => (
          <Card key={event.name} className="rounded-none flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  <span className="text-2xl mr-2">{event.symbol}</span>
                  {event.name}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-muted-foreground rounded-none h-9 px-3 flex items-center justify-center text-sm border border-border"
                >
                  {event.status}
                </Badge>
              </div>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Time:</strong> {event.time}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
