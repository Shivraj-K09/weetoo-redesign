import { Metadata } from "next";
import { InboxPage } from "@/components/inbox/inbox-page";

export const metadata: Metadata = {
  title: "Inbox | Weetoo",
  description: "Manage your messages and communications",
};

export default function InboxPageRoute() {
  return <InboxPage />;
}
