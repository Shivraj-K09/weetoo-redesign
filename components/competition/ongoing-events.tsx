"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";

const events = [
  {
    symbol: "🥇",
    name: "Golden Gurus Trading",
    description: "The ultimate test of trading prowess.",
    date: "2024-08-01 to 2024-08-31",
    time: "All Day",
    status: "inprogress",
  },
  {
    symbol: "🚀",
    name: "Rocket Returns Challenge",
    description: "Aim for the highest returns in a week.",
    date: "2024-09-05 to 2024-09-12",
    time: "9:00 AM - 5:00 PM",
    status: "joinable",
  },
  {
    symbol: "💎",
    name: "Diamond Hands Derby",
    description: "Hold your assets and prove your conviction.",
    date: "2024-09-15 to 2024-10-15",
    time: "Market Hours",
    status: "inprogress",
  },
  {
    symbol: "📈",
    name: "Momentum Masters",
    description: "Ride the wave of market momentum.",
    date: "2024-10-01 to 2024-10-07",
    time: "All Day",
    status: "joinable",
  },
  {
    symbol: "⚡",
    name: "Lightning FX Fray",
    description: "Fast-paced forex trading competition.",
    date: "2024-10-10",
    time: "10:00 AM - 2:00 PM",
    status: "inprogress",
  },
  {
    symbol: "🏆",
    name: "Championship Challenge",
    description: "The annual grand trading championship.",
    date: "2024-11-01 to 2024-11-30",
    time: "All Day",
    status: "joinable",
  },
  {
    symbol: "💡",
    name: "Innovative Investors",
    description: "Showcase your unique investment strategies.",
    date: "2024-11-05 to 2024-11-19",
    time: "Market Hours",
    status: "inprogress",
  },
  {
    symbol: "🌍",
    name: "Global Growth Contest",
    description: "Compete on the international stage.",
    date: "2024-12-01 to 2024-12-31",
    time: "All Day",
    status: "joinable",
  },
  {
    symbol: "🤖",
    name: "Algo-Trading Arena",
    description: "Let your trading bots do the talking.",
    date: "2024-12-10 to 2024-12-15",
    time: "24/7",
    status: "inprogress",
  },
  {
    symbol: "👑",
    name: "King of Crypto",
    description: "Dominate the cryptocurrency markets.",
    date: "2025-01-02 to 2025-01-31",
    time: "All Day",
    status: "joinable",
  },
  {
    symbol: "S",
    name: "Stock Market Scholars",
    description: "A battle of wits in the stock market.",
    date: "2025-02-01 to 2025-02-28",
    time: "Market Hours",
    status: "inprogress",
  },
  {
    symbol: "O",
    name: "Options Olympiad",
    description: "Master the art of options trading.",
    date: "2025-03-01 to 2025-03-15",
    time: "9:00 AM - 4:00 PM",
    status: "joinable",
  },
  {
    symbol: "F",
    name: "Futures Frenzy",
    description: "Predict the future and win big.",
    date: "2025-03-20 to 2025-03-27",
    time: "All Day",
    status: "inprogress",
  },
  {
    symbol: "E",
    name: "ETF Enigma",
    description: "The ultimate challenge in ETF trading.",
    date: "2025-04-01 to 2025-04-10",
    time: "Market Hours",
    status: "joinable",
  },
  {
    symbol: "B",
    name: "Bond Baron Bonanza",
    description: "A test of skill in the bond market.",
    date: "2025-04-15 to 2025-04-30",
    time: "All Day",
    status: "inprogress",
  },
  {
    symbol: "C",
    name: "Commodities Clash",
    description: "Trade your way to victory in commodities.",
    date: "2025-05-05 to 2025-05-12",
    time: "24/5",
    status: "joinable",
  },
  {
    symbol: "V",
    name: "Volatility Vikings",
    description: "Conquer the markets in times of volatility.",
    date: "2025-05-20 to 2025-05-27",
    time: "Market Hours",
    status: "inprogress",
  },
  {
    symbol: "P",
    name: "Penny Stock Power",
    description: "The ultimate challenge in penny stocks.",
    date: "2025-06-02 to 2025-06-09",
    time: "9:30 AM - 4:00 PM",
    status: "joinable",
  },
  {
    symbol: "R",
    name: "REIT Rumble",
    description: "Compete for the top spot in real estate.",
    date: "2025-06-15 to 2025-06-30",
    time: "Market Hours",
    status: "inprogress",
  },
  {
    symbol: "I",
    name: "Index Fund Invitational",
    description: "A battle of strategies in index funds.",
    date: "2025-07-01 to 2025-07-15",
    time: "All Day",
    status: "joinable",
  },
];

const ITEMS_PER_PAGE = 12;

export function OngoingEvents() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  const currentEvents = events.slice(
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
                <div className="hidden sm:block">
                  {event.status === "inprogress" ? (
                    <Badge
                      variant="outline"
                      className="text-green-500 rounded-none h-9 px-3 flex items-center justify-center text-sm"
                    >
                      In Progress
                    </Badge>
                  ) : (
                    <Button size="sm" className="rounded-none">
                      Join Competition
                    </Button>
                  )}
                </div>
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
            <div className="px-6 pb-4 sm:hidden">
              {event.status === "inprogress" ? (
                <Badge
                  variant="outline"
                  className="text-green-500 w-full h-9 rounded-none flex items-center justify-center text-sm"
                >
                  In Progress
                </Badge>
              ) : (
                <Button size="sm" className="rounded-none w-full">
                  Join Competition
                </Button>
              )}
            </div>
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
