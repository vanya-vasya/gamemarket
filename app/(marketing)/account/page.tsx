import { CircleUserRound } from "lucide-react";
import type { Metadata } from "next";
import { AccountGate } from "@/components/auth-card";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <AccountGate
      icon={CircleUserRound}
      title="Account"
      body="Balance, withdrawals, seller verification, affiliate settings and security options live here after you sign in."
    />
  );
}
