"use client";

import Link from "next/link";
import { Menu } from "./menu";
import { ThemeToggle } from "./theme-toggle";
import { UserDropdown } from "./user/user-dropdown";
import { Button } from "./ui/button";
import { Menu as MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Header() {
  return (
    <header className="w-full border-dashed border-border border-b sticky top-0 z-50 bg-background">
      <div className="h-14 flex justify-between w-full items-center container mx-auto gap-2 md:gap-4 px-4">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            WEETOO
          </span>
          {/* <span className="text-xs">We Trade, Weetoo</span> */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <Menu />
        </div>

        <div className="flex items-center gap-2">
          {/* <Button variant="outline" className="cursor-pointer shadow-none h-10">
            Login/Register
          </Button> */}

          <ThemeToggle />
          <UserDropdown />

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle Menu"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <VisuallyHidden>
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
              </VisuallyHidden>
              <div className="flex flex-col gap-4 mt-4">
                <Menu />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
