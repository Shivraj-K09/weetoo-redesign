"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { PhoneInput } from "../ui/phone-input";

export function Profile() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="border-b flex flex-shrink-0">
          <div className="p-4 border-r space-y-2">
            <Image
              src="https://images.unsplash.com/photo-1744023155454-f1cc0ff0747e?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile Picture"
              className="object-cover h-[250px] w-[300px] border"
              width={300}
              height={250}
            />

            <Button variant="outline" className="rounded-none w-full">
              Upload Image
            </Button>
          </div>
          <div className="p-4 w-full space-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-sm font-semibold">
                  First Name
                </Label>
                <Input placeholder="First Name" className="rounded-none h-10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-sm font-semibold">
                  Last Name
                </Label>
                <Input placeholder="Last Name" className="rounded-none h-10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-sm font-semibold">
                  Nickname
                </Label>
                <Input placeholder="Nickname" className="rounded-none h-10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email
                </Label>
                <Input placeholder="Email" className="rounded-none h-10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Phone
                </Label>
                <PhoneInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  international
                  defaultCountry="KR"
                  className="rounded-none"
                  id="phone"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border w-full fixed bottom-0 left-0 bg-background z-50 text-center py-2 shadow-md">
        Hey
      </div>
    </>
  );
}
