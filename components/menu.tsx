"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const community: { title: string; href: string; description: string }[] = [
  {
    title: "Free Bulletin Board",
    href: "/free-board",
    description:
      "Open discussions about market trends, strategies, and general trading topics",
  },
  {
    title: "Profit Bulletin Board",
    href: "/profit-board",
    description:
      "Share profitable trades with verified results and proven strategies",
  },
  {
    title: "Education Bulletin Board",
    href: "/education-board",
    description:
      "Learn from expert tutorials, guides, and educational trading content",
  },
];

const information: { title: string; href: string; description: string }[] = [
  {
    title: "Comprehensive Data",
    href: "/comprehensive-data",
    description:
      "Access real-time market data, charts, analytics, and trading indicators",
  },
  {
    title: "News",
    href: "/news",
    description:
      "Stay updated with breaking crypto news, market analysis, and regulatory updates",
  },
];

const exchange: { title: string; href: string; description: string }[] = [
  {
    title: "Coin Futures Exchange Comparison",
    href: "/coin-futures",
    description:
      "Compare Korean crypto exchanges - fees, features, security, and trading pairs",
  },

  {
    title: "Overseas Futures Comparison",
    href: "/overseas-futures",
    description:
      "Compare international exchanges - regulations, leverage, and global trading options",
  },
];

export function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Trading</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem href="/trading" title="Start Trading">
                Begin live trading with real-time market data and advanced tools
              </ListItem>
              <ListItem href="/ranking" title="Trader Rankings">
                View top performing traders and their success rates
              </ListItem>
              <ListItem href="/kor-coins" title="Kor Coins Rankings">
                Track Korean cryptocurrency performance and market trends
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Community</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {community.map((community) => (
                <ListItem
                  key={community.title}
                  title={community.title}
                  href={community.href}
                >
                  {community.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/investment-competition"
              className={navigationMenuTriggerStyle()}
            >
              Investment Competition
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Information</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {information.map((information) => (
                <ListItem
                  key={information.title}
                  title={information.title}
                  href={information.href}
                >
                  {information.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Exchange</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {exchange.map((exchange) => (
                <ListItem
                  key={exchange.title}
                  title={exchange.title}
                  href={exchange.href}
                >
                  {exchange.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<typeof Link> {
  title: string;
}

const ListItem = React.forwardRef<React.ElementRef<typeof Link>, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
