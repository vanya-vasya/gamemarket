import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import { upsertUser } from "@/lib/sync-user";

export const runtime = "nodejs";

export const POST = async (request: NextRequest) => {
  let event;
  try {
    event = await verifyWebhook(request, {
      signingSecret:
        process.env.CLERK_WEBHOOK_SIGNING_SECRET ?? process.env.SIGNING_SECRET,
    });
  } catch {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  if (event.type !== "user.created" && event.type !== "user.updated") {
    return new Response("Event ignored", { status: 200 });
  }

  const { data } = event;
  const primaryAddress =
    data.email_addresses.find((address) => address.id === data.primary_email_address_id) ??
    data.email_addresses[0];
  const email = primaryAddress?.email_address;
  if (!email) {
    console.warn("Clerk webhook: user has no email address, skipping", data.id);
    return new Response("No email address, skipped", { status: 200 });
  }

  try {
    await upsertUser({
      clerkId: data.id,
      email,
      photo: data.image_url ?? "",
      firstName: data.first_name,
      lastName: data.last_name,
    });
  } catch (error) {
    console.error("Clerk webhook: failed to sync user", error);
    return new Response("Failed to sync user", { status: 500 });
  }

  return new Response("OK", { status: 200 });
};
