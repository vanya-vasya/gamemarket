import { Bell } from "lucide-react";
import type { Metadata } from "next";
import { AccountGate } from "@/components/auth-card";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <AccountGate
      icon={Bell}
      title="Notifications"
      body="Order updates, chat messages, dispute decisions and support replies land here once you are signed in."
    />
  );
}
