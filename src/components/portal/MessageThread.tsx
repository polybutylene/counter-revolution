"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, User, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Id } from "../../../convex/_generated/dataModel";

interface MessageThreadProps {
  projectId: Id<"projects">;
  customerName: string;
}

export function MessageThread({ projectId, customerName }: MessageThreadProps) {
  const messages = useQuery(api.messages.getByProject, { projectId });
  const sendMessage = useMutation(api.messages.send);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!body.trim()) return;
    setSending(true);
    try {
      await sendMessage({
        projectId,
        senderType: "customer",
        senderName: customerName,
        body: body.trim(),
      });
      setBody("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      {/* Messages */}
      <div className="max-h-96 space-y-4 overflow-y-auto pr-2">
        {messages === undefined && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-navy" />
          </div>
        )}
        {messages && messages.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No messages yet. Send a message to start the conversation.
          </div>
        )}
        {messages?.map((msg) => {
          const isTeam = msg.senderType === "team";
          return (
            <div
              key={msg._id}
              className={cn(
                "flex gap-3",
                isTeam ? "flex-row" : "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  isTeam ? "bg-navy text-white" : "bg-gold/20 text-gold"
                )}
              >
                {isTeam ? <Wrench className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div
                className={cn(
                  "max-w-[75%] rounded-xl px-4 py-2",
                  isTeam ? "bg-warm-light" : "bg-navy text-white"
                )}
              >
                <p className={cn("text-xs font-semibold", isTeam ? "text-navy" : "text-gold-light")}>
                  {msg.senderName}
                </p>
                <p className={cn("mt-1 text-sm", isTeam ? "text-dark" : "text-gray-100")}>
                  {msg.body}
                </p>
                <p className={cn("mt-1 text-xs", isTeam ? "text-muted-foreground" : "text-gray-400")}>
                  {new Date(msg._creationTime).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={2}
          className="flex-1 resize-none"
        />
        <Button
          variant="gold"
          size="icon"
          onClick={handleSend}
          disabled={!body.trim() || sending}
          className="h-auto shrink-0 self-end"
          aria-label="Send message"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
