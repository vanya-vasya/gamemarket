import { Package } from "lucide-react";
import type { Metadata } from "next";
import { AccountPlaceholder } from "@/components/auth-card";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <AccountPlaceholder
      icon={Package}
      title="Your orders"
      body="See running and completed orders, open the order chat for each deal and confirm deliveries."
    />
  );
}
