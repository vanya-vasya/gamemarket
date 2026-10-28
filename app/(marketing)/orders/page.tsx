import { Package } from "lucide-react";
import type { Metadata } from "next";
import { AccountGate } from "@/components/auth-card";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <AccountGate
      icon={Package}
      title="Your orders"
      body="Sign in to see running and completed orders, open the order chat for each deal and confirm deliveries."
    />
  );
}
