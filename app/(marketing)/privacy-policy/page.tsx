import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      sections={[
        {
          heading: "1. What we collect",
          body: [
            "Account data (email, username, password hash), seller verification documents, order and chat history, payment metadata (never full card numbers), device and usage information such as IP address and browser type.",
          ],
        },
        {
          heading: "2. How we use it",
          body: [
            `To operate the marketplace, run ${BRAND.protection}, resolve disputes, prevent fraud and multiple-account abuse, process withdrawals, send order notifications and improve the Platform.`,
            "Chat history is stored because it serves as evidence in disputes. It is visible to the two parties of the chat and to administrators handling a dispute.",
          ],
        },
        {
          heading: "3. Sharing",
          body: [
            "We share data with payment processors to complete payments and withdrawals, with identity verification providers for seller verification, and with authorities when required by law. We do not sell personal data.",
          ],
        },
        {
          heading: "4. Cookies",
          body: [
            "We use strictly necessary cookies for sign-in and security, and functional cookies to remember your currency and affiliate referral for up to 100 days. Analytics cookies are used only in aggregate.",
          ],
        },
        {
          heading: "5. Retention",
          body: [
            "Order, chat and payment records are kept for as long as needed to handle disputes and meet legal obligations, typically five years. Verification documents are deleted once verification is complete except where law requires retention.",
          ],
        },
        {
          heading: "6. Your rights",
          body: [
            "You can access, correct or export your data from Account settings and request deletion once all orders are complete and your balance is withdrawn. Contact support to exercise any other right available under your local law.",
          ],
        },
        {
          heading: "7. Security",
          body: [
            "Data is encrypted in transit and at rest. Two-factor authentication is available for every account and recommended for sellers.",
          ],
        },
        {
          heading: "8. Contact",
          body: ["Privacy questions can be submitted through the Support page with the topic “Account & security”."],
        },
      ]}
    />
  );
}
