import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Create your studio" };

export default function SignupPage() {
  return (
    <AuthShell
      heading="Create your studio"
      subheading="20 credits land on your balance right away — enough for a first batch of frames. No card needed."
    >
      {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
          fallbackRedirectUrl="/dashboard"
          appearance={{ elements: { rootBox: "w-full", cardBox: "w-full shadow-none" } }}
        />
      ) : (
        <p className="rounded-2xl border border-black/8 bg-white p-5 text-sm leading-relaxed text-zinc-600">
          Sign-up is not configured on this deployment yet. Add the Clerk keys
          to the Vercel project environment.
        </p>
      )}
    </AuthShell>
  );
}
