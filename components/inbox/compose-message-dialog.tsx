"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Paperclip, Trash2, UploadCloud } from "lucide-react";

interface ComposeMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComposeMessageDialog({
  open,
  onOpenChange,
}: ComposeMessageDialogProps) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setTo("");
      setSubject("");
      setMessage("");
      setAttachments([]);
      onOpenChange(false);
    }, 1000);
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
      e.target.value = "";
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setAttachments((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full p-0 rounded-xl shadow-xl border bg-background">
        <form onSubmit={handleSend} className="flex flex-col w-full">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-xl font-semibold">
              Compose Message
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 pt-2 pb-0 flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs font-medium" htmlFor="compose-to">
                To
              </label>
              <Input
                id="compose-to"
                placeholder="Recipient email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
                autoFocus
                className="w-full max-w-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs font-medium" htmlFor="compose-subject">
                Subject
              </label>
              <Input
                id="compose-subject"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full max-w-full"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs font-medium" htmlFor="compose-message">
                Message
              </label>
              <Textarea
                id="compose-message"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={7}
                required
                className="resize-none h-40 w-full max-w-full overflow-y-auto break-words"
                style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
              />
            </div>
            {/* Attachment area */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs font-medium">Attachments</label>
              <div
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors cursor-pointer bg-muted/40 hover:bg-muted/60 ${
                  dragActive ? "border-primary bg-muted/70" : "border-border"
                }`}
                style={{ minHeight: 64 }}
                onClick={handleAttachClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center py-3 w-full">
                  <UploadCloud className="h-6 w-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">
                    Drag & drop or click to attach files
                  </span>
                </div>
              </div>
              {attachments.length > 0 && (
                <div className="flex flex-col gap-1 mt-2 w-full">
                  {attachments.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-muted rounded px-2 py-1 text-xs w-full"
                    >
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate flex-1" title={file.name}>
                        {file.name}
                      </span>
                      <span className="text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        aria-label="Remove attachment"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveAttachment(idx);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Separator className="my-4" />
          <DialogFooter className="px-6 pb-5 flex gap-2 justify-end w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={sending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
