import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { BRAND } from "@/lib/brand";

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
        <h2 className="text-lg font-semibold text-zinc-900">
          {isLogin ? "Sign in" : "Create account"}
        </h2>
        <form className="mt-5 space-y-4" action={isLogin ? "/login" : "/signup"} method="get">
          <input type="hidden" name="pending" value="1" />
          {next && <input type="hidden" name="next" value={next} />}
          {!isLogin && (
            <label className="block text-sm">
              <span className="font-medium text-zinc-700">Username</span>
              <input
                name="username"
                required
                autoComplete="username"
                className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-purple-400"
              />
            </label>
          )}
          <label className="block text-sm">
            <span className="font-medium text-zinc-700">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-purple-400"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-zinc-700">Password</span>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-purple-400"
            />
          </label>
          <button type="submit" className="btn-gradient w-full px-6 py-3 text-sm">
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-zinc-500">
          {isLogin ? (
            <>
              New here?{" "}
              <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in
              </Link>
            </>
          )}
        </p>
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

export const PendingNotice = ({ title, body }: { title: string; body: string }) => (
  <div className="card-panel mx-auto my-16 max-w-xl p-8 text-center">
    <Logo />
    <h1 className="mt-6 text-2xl font-bold tracking-tight">{title}</h1>
    <p className="mt-3 text-sm leading-relaxed text-zinc-600">{body}</p>
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <Link href="/market" className="btn-gradient px-6 py-2.5 text-sm">
        Browse markets
      </Link>
      <Link
        href="/support"
        className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm text-zinc-700 hover:border-zinc-400"
      >
        Contact support
      </Link>
    </div>
  </div>
);

export const AccountGate = ({
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
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/login" className="btn-gradient px-6 py-2.5 text-sm">
          Sign in
        </Link>
        <Link
          href="/signup"
          className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm text-zinc-700 hover:border-zinc-400"
        >
          Create account
        </Link>
      </div>
    </div>
  </div>
);
