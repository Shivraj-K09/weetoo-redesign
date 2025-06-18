export type MessageCategory =
  | "all"
  | "inbox"
  | "sent"
  | "drafts"
  | "trash"
  | "spam"
  | "starred";

export interface Message {
  id: string;
  subject: string;
  content: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  recipient: {
    name: string;
    email: string;
  };
  category: MessageCategory;
  status: "read" | "unread";
  priority: "low" | "normal" | "high";
  timestamp: string;
  attachments?: Array<{
    name: string;
    size: number;
    type: string;
  }>;
  isStarred?: boolean;
  isImportant?: boolean;
}

export interface InboxStats {
  total: number;
  unread: number;
  read: number;
  starred: number;
  important: number;
}
