"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const AuthControls = () => (
  <>
    <Show when="signed-out">
      <Link
        href="/login"
        className="text-sm text-zinc-700 transition-colors hover:text-zinc-900"
      >
        Sign in
      </Link>
    </Show>
    <Show when="signed-in">
      <UserButton
        userProfileUrl="/account"
        appearance={{ variables: { colorPrimary: "#9333ea" } }}
      />
    </Show>
  </>
);
