import { UserProfile } from "@clerk/nextjs";
import type { Metadata } from "next";
import { CLERK_APPEARANCE } from "@/lib/clerk";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div className="mx-auto flex max-w-5xl justify-center px-4 py-10 sm:px-6">
      <UserProfile
        path="/account"
        appearance={{
          variables: CLERK_APPEARANCE.variables,
          elements: { rootBox: "w-full", cardBox: "w-full max-w-full" },
        }}
      />
    </div>
  );
}
