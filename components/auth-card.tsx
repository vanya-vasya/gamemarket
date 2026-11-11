import { SignIn, SignUp } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { BRAND } from "@/lib/brand";
import { CLERK_APPEARANCE } from "@/lib/clerk";

const PERKS = [
  `Every order covered by ${BRAND.protection}`,
  "Market-specific reviews before you buy",
  "0% commission and instant payouts for sellers",
  "Earn up to 50% as an affiliate with your link",
];

export const AuthCard = ({
  mode,
  next,
}: {
  mode: "login" | "signup";
  next?: string;
}) => {
  const isLogin = mode === "login";
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
      <div>
        <Logo />
        <h1 className="mt-8 text-4xl font-bold tracking-tight">
          {isLogin ? (
            <>
              Welcome <span className="text-gradient">back</span>
            </>
          ) : (
            <>
              Join <span className="text-gradient">{BRAND.name}</span>
            </>
          )}
        </h1>
        <p className="mt-4 text-zinc-600">
          {isLogin
            ? "Sign in to track orders, chat with sellers and manage your balance."
            : "Create a free account to buy with protection or get verified and start selling."}
        </p>
        <ul className="mt-8 space-y-3 text-sm text-zinc-600">
          {PERKS.map((perk) => (
            <li key={perk} className="flex gap-2">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-purple-600" aria-hidden />
              {perk}
            </li>
          ))}
        </ul>
      </div>

      <div className="card-panel p-6 sm:p-8">
        {isLogin ? (
          <SignIn
            path="/login"
            signUpUrl="/signup"
            fallbackRedirectUrl={next}
            appearance={CLERK_APPEARANCE}
          />
        ) : (
          <SignUp
            path="/signup"
            signInUrl="/login"
            fallbackRedirectUrl={next}
            appearance={CLERK_APPEARANCE}
          />
        )}
        <p className="mt-6 border-t border-black/5 pt-4 text-center text-xs text-zinc-400">
          By continuing you agree to the{" "}
          <Link href="/terms-of-service" className="hover:text-zinc-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="hover:text-zinc-700">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export const AccountPlaceholder = ({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
    <div className="card-panel p-8 text-center">
      <span className="mx-auto inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 text-white">
        <Icon className="size-6" />
      </span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">{body}</p>
      <div className="mt-6 flex justify-center">
        <Link href="/market" className="btn-gradient px-6 py-2.5 text-sm">
          Browse markets
        </Link>
      </div>
    </div>
  </div>
);
