"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const exchanges = [
  {
    id: "bitget",
    name: "BITGET",
    avatar: "BG",
    avatarBg: "bg-blue-500",
    description: "83% fee payback, and up to 50% payback on generated fees.",
    descriptionLinkText: "[Click]",
    disabled: false,
  },
  {
    id: "gateio",
    name: "GATE.IO",
    avatar: "GA",
    avatarBg: "bg-indigo-500",
    description: "100% fee payback, and up to 85% payback on generated fees.",
    descriptionLinkText: "[Click]",
    disabled: false,
  },
  {
    id: "hashkey",
    name: "HASHKEY",
    avatar: "HA",
    avatarBg: "bg-purple-500",
    description: "100% fee payback.",
    descriptionLinkText: "[Click]",
    disabled: false,
  },
  {
    id: "mexc",
    name: "MEXC",
    avatar: "ME",
    avatarBg: "bg-gray-400",
    description: "Registration currently unavailable",
    disabled: true,
  },
];

type Exchange = (typeof exchanges)[0];

export default function UIDRegistrationClient() {
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(
    null
  );

  return (
    <div className="container mx-auto h-full max-w-4xl p-4 md:p-8">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">UID Registration</h1>
        <p className="text-muted-foreground">
          Select an exchange to register your UID and enjoy fee payback
          benefits.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {exchanges.map((exchange) => (
              <div
                key={exchange.id}
                className={cn(
                  "group flex items-center justify-between p-4 md:p-6 transition-colors",
                  exchange.disabled
                    ? "cursor-not-allowed bg-muted/50"
                    : "hover:bg-muted/50 cursor-pointer"
                )}
                onClick={() =>
                  !exchange.disabled && setSelectedExchange(exchange)
                }
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback
                      className={cn(
                        "text-lg font-semibold text-white",
                        exchange.avatarBg
                      )}
                    >
                      {exchange.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold text-lg">{exchange.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exchange.description}
                      {exchange.descriptionLinkText && (
                        <Link
                          href="#"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-500 hover:underline ml-1"
                        >
                          {exchange.descriptionLinkText}
                        </Link>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {exchange.disabled && (
                    <span className="text-sm font-medium text-muted-foreground">
                      Unavailable
                    </span>
                  )}
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedExchange && (
        <Dialog
          open={!!selectedExchange}
          onOpenChange={(isOpen) => !isOpen && setSelectedExchange(null)}
        >
          <DialogContent className="sm:max-w-lg p-0">
            <DialogHeader className="p-6">
              <div className="mx-auto w-fit mb-4 p-2 bg-muted rounded-full">
                <Avatar className="h-16 w-16">
                  <AvatarFallback
                    className={cn(
                      "text-xl font-semibold text-white",
                      selectedExchange.avatarBg
                    )}
                  >
                    {selectedExchange.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
              <DialogTitle className="text-2xl font-bold text-center">
                {selectedExchange.name} UID Registration
              </DialogTitle>
            </DialogHeader>

            <div className="px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="uid" className="font-semibold">
                  Enter your UID
                </Label>
                <Input
                  id="uid"
                  placeholder="Your unique identifier"
                  className="h-12 text-base"
                />
              </div>

              <div className="text-xs text-muted-foreground space-y-2 mt-4 p-4 bg-muted/50 rounded-lg border">
                <p className="font-bold text-foreground mb-2">Please note:</p>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Member ID (email) information and 100% fee payback.</li>
                  <li>
                    Application is completed only when signing up with a member
                    ID (email).
                  </li>
                  <li>Completed within 24 hours (on business days).</li>
                  <li>
                    Application with another person&apos;s ID (email) is not
                    possible.
                  </li>
                  <li>
                    Existing HASHKEY members can only receive payback from
                    certain contracts.
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t">
                  <Link
                    href="#"
                    className="text-blue-600 hover:underline flex items-center space-x-2 group"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                        H
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold group-hover:text-blue-700">
                      HASHKEY - Korea Payback Details
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <DialogFooter className="bg-muted/50 px-6 py-4">
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedExchange(null)}
                  className="h-10"
                >
                  Cancel
                </Button>
                <Button type="submit" className="h-10">
                  Register UID
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
