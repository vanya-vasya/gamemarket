import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthShell
      heading="Welcome back"
      subheading="Sign in to open the studio and spend your credits."
    >
      {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          fallbackRedirectUrl="/dashboard"
          appearance={{ elements: { rootBox: "w-full", cardBox: "w-full shadow-none" } }}
        />
      ) : (
        <p className="rounded-2xl border border-black/8 bg-white p-5 text-sm leading-relaxed text-zinc-600">
          Sign-in is not configured on this deployment yet. Add the Clerk keys
          to the Vercel project environment.
        </p>
      )}
    </AuthShell>
  );
}
