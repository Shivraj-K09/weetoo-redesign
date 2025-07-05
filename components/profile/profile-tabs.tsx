"use client";
import { useState } from "react";
import { Profile } from "./profile";
import { Messages } from "./messages";
import { KorCoinsActivity } from "./kor-coins-activity";
import { UuidRegistration } from "./uuid-registration";
import { ActivityIcon, KeyIcon, MailIcon, UserIcon } from "lucide-react";

const TABS = [
  { key: "profile", label: "Profile", icon: <UserIcon className="w-4 h-4" /> },
  {
    key: "messages",
    label: "Messages",
    icon: <MailIcon className="w-4 h-4" />,
  },
  {
    key: "kor-coins",
    label: "Kor-Coins Activity",
    icon: <ActivityIcon className="w-4 h-4" />,
  },
  {
    key: "uuid",
    label: "UUID Registration",
    icon: <KeyIcon className="w-4 h-4" />,
  },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const TAB_COMPONENTS = {
  profile: <Profile />,
  messages: <Messages />,
  "kor-coins": <KorCoinsActivity />,
  uuid: <UuidRegistration />,
};

export function ProfileTabs() {
  const [selectedTab, setSelectedTab] = useState<TabKey>("profile");

  return (
    <>
      {/* Redesigned Left Tabs */}
      <div className="w-[250px] p-4 border-r flex flex-col text-sm gap-2 bg-background flex-shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`text-left h-10 px-4 transition font-medium flex gap-2 items-center cursor-pointer
              ${
                selectedTab === tab.key
                  ? "border font-semibold"
                  : "hover:bg-accent text-muted-foreground"
              }
            `}
            onClick={() => setSelectedTab(tab.key)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      {/* Right Content */}
      <div className="flex-1 flex flex-col">{TAB_COMPONENTS[selectedTab]}</div>
    </>
  );
}
