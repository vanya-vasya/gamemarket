import { Bell } from "lucide-react";
import type { Metadata } from "next";
import { AccountPlaceholder } from "@/components/auth-card";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <AccountPlaceholder
      icon={Bell}
      title="Notifications"
      body="Order updates, chat messages, dispute decisions and support replies land here."
    />
  );
}
