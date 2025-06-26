"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Coins,
  InboxIcon,
  KeyRoundIcon,
  LogOutIcon,
  ShieldIcon,
  Star,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { CustomerSupportDialog } from "./customer-support-dialog";

export function UserDropdown() {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full p-0 hover:bg-accent transition-colors cursor-pointer"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage
                src="https://vercel.com/api/www/avatar?s=64&u=shivraj-k09"
                alt="@shadcn"
              />
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-medium">
                CN
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-72 p-0 bg-card/95 backdrop-blur-sm border shadow-lg rounded-xl overflow-hidden"
          align="end"
          sideOffset={8}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b bg-muted/30">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-medium">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">shadcn</div>
                <div className="text-xs text-muted-foreground">
                  shadcn@gmail.com
                </div>
              </div>
            </div>
            {/* Improved Level Card Section */}
            <div className="my-3 p-3 rounded-xl bg-muted/60 shadow-sm border border-border flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-muted-foreground">
                  Level 0
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Level 1
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative mb-1">
                <div
                  className="absolute left-0 top-0 h-2 bg-red-500 rounded-full"
                  style={{ width: `4%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-muted-foreground">4% Complete</span>
                <span className="text-red-500 font-semibold">450 EXP</span>
              </div>
              <div className="flex items-center justify-between gap-4 mt-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500" />
                  1,234 XP
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Coins className="h-4 w-4 text-amber-500" />
                  567 KOR
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-accent transition-colors">
                <UserIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                Profile
              </DropdownMenuItem>
            </Link>

            <Link href="/inbox">
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-accent transition-colors">
                <InboxIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                Inbox
              </DropdownMenuItem>
            </Link>

            {/* <Link href="#">
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-accent transition-colors">
                <SettingsIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                Settings
              </DropdownMenuItem>
            </Link> */}
            <Link href="/uid-registration">
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-accent transition-colors">
                <KeyRoundIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                UID Registration
              </DropdownMenuItem>
            </Link>

            <Link href="/admin-verification">
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-accent transition-colors">
                <ShieldIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                Go to Admin Dashboard
              </DropdownMenuItem>
            </Link>

            {/* <Link href="#">
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 hover:bg-accent transition-colors">
                <BellIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                Notifications
              </DropdownMenuItem>
            </Link> */}

            <DropdownMenuSeparator className="my-2" />

            {/* KOR Coins Recharge*/}
            {/* <KorCoinsRechargeDialog /> */}

            {/* Customer Support */}
            <CustomerSupportDialog />

            <DropdownMenuSeparator className="my-2" />

            <Link href="#">
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                <LogOutIcon className="w-4 h-4 mr-3 text-red-500" />
                Sign Out
              </DropdownMenuItem>
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
