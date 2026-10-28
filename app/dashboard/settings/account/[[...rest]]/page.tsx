import type { Metadata } from "next";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Account</h1>
      <p className="max-w-xl text-sm leading-relaxed text-zinc-600">
        Account management is turned off until Clerk is connected to this
        deployment.
      </p>
    </div>
  );
}
