import { createId } from "@paralleldrive/cuid2";
import { getSql } from "@/lib/db";

export type ClerkUserSnapshot = {
  clerkId: string;
  email: string;
  photo: string;
  firstName: string | null;
  lastName: string | null;
};

export const upsertUser = async (user: ClerkUserSnapshot) => {
  const sql = getSql();
  await sql`
    INSERT INTO "User" ("id", "clerkId", "email", "photo", "firstName", "lastName", "updatedAt")
    VALUES (${createId()}, ${user.clerkId}, ${user.email}, ${user.photo}, ${user.firstName}, ${user.lastName}, CURRENT_TIMESTAMP)
    ON CONFLICT ("clerkId") DO UPDATE SET
      "email" = EXCLUDED."email",
      "photo" = EXCLUDED."photo",
      "firstName" = EXCLUDED."firstName",
      "lastName" = EXCLUDED."lastName",
      "updatedAt" = CURRENT_TIMESTAMP`;
};
