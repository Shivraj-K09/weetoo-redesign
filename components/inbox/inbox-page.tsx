"use client";

import { useState } from "react";
import { InboxHeader } from "./inbox-header";
import { InboxFilters } from "./inbox-filters";
import { InboxMessageList } from "./inbox-message-list";
import { InboxMessageDetail } from "./inbox-message-detail";
import { InboxSidebar } from "./inbox-sidebar";
import type { Message, MessageCategory } from "./inbox-types";
import { ComposeMessageDialog } from "./compose-message-dialog";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<MessageCategory>("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "read" | "unread"
  >("all");
  const [composeOpen, setComposeOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-full p-2 sm:p-5">
      <div className="flex flex-col md:flex-row h-full rounded-lg bg-background border overflow-hidden">
        {/* Sidebar for desktop, drawer for mobile */}
        <div className="md:block hidden h-full">
          <InboxSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onComposeClick={() => setComposeOpen(true)}
          />
        </div>
        {/* Sidebar drawer for mobile */}
        <div className="md:hidden flex items-center p-2 border-b border-border bg-background">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="ml-2 text-lg font-semibold">Inbox</span>
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 z-40 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-64 bg-background h-full shadow-lg"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <InboxSidebar
                  selectedCategory={selectedCategory}
                  onCategoryChange={(cat) => {
                    setSelectedCategory(cat);
                    setSidebarOpen(false);
                  }}
                  onComposeClick={() => {
                    setComposeOpen(true);
                    setSidebarOpen(false);
                  }}
                />
              </motion.div>
              <div
                className="flex-1 bg-black/40"
                onClick={() => setSidebarOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <InboxHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          {/* Filters */}
          <InboxFilters
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Message List (show only if no message selected on mobile) */}
            <div
              className={
                `border-r border-border h-full ` +
                `w-full md:w-1/2 ` +
                `${selectedMessage ? "hidden" : "block"} md:block`
              }
            >
              <InboxMessageList
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedStatus={selectedStatus}
                selectedMessage={selectedMessage}
                onMessageSelect={setSelectedMessage}
              />
            </div>

            {/* Message Detail (show only if message selected on mobile) */}
            <div
              className={
                `h-full w-full md:w-1/2 ` +
                `${selectedMessage ? "block" : "hidden"} md:block`
              }
            >
              <InboxMessageDetail
                message={selectedMessage}
                onMessageUpdate={(updatedMessage: Message) => {
                  setSelectedMessage(updatedMessage);
                }}
                onClose={() => setSelectedMessage(null)}
              />
            </div>
          </div>
        </div>
        <ComposeMessageDialog
          open={composeOpen}
          onOpenChange={setComposeOpen}
        />
      </div>
    </div>
  );
}
