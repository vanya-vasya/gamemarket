import { MessageSquare } from "lucide-react";
import type { Metadata } from "next";
import { AccountPlaceholder } from "@/components/auth-card";

export const metadata: Metadata = { title: "Chat" };

export default function ChatPage() {
  return (
    <AccountPlaceholder
      icon={MessageSquare}
      title="Chat"
      body="Two chat lanes: a regular room for questions and negotiation, plus a dedicated order chat that opens automatically for every running transaction."
    />
  );
}
