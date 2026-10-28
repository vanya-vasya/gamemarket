import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 2026"
      sections={[
        {
          heading: "1. Acceptance of terms",
          body: [
            `By creating an account or using ${BRAND.name} (the "Platform") you agree to these Terms of Service, the Privacy Policy and any rules published on the Platform. If you do not agree, do not use the Platform.`,
            "You must be at least 18 years old, or the age of majority in your jurisdiction, to buy or sell on the Platform.",
          ],
        },
        {
          heading: "2. The marketplace",
          body: [
            `${BRAND.name} is a venue where independent sellers list game accounts, boosting, top ups, items and hourly services and buyers purchase them. ${BRAND.name} is not a party to the sale itself and does not own the listed goods or services.`,
            `All payments are processed through the Platform and held under ${BRAND.protection} until the buyer confirms the order or the order completes automatically after the stated period.`,
          ],
        },
        {
          heading: "3. Buyer obligations",
          body: [
            "Pay only through the Platform, communicate inside the order chat and inspect delivered goods before confirming the order.",
            "Abuse of disputes, chargebacks on completed orders or attempts to obtain goods without paying result in a permanent ban.",
          ],
        },
        {
          heading: "4. Seller obligations",
          body: [
            "Sellers must complete identity verification before listing. Listings must be accurate, lawful and owned by the seller. Delivery must happen inside the order chat with proof uploaded.",
            "Multiple accounts, off-platform trading, fake reviews and stolen assets are prohibited and lead to account closure and forfeiture of balance.",
          ],
        },
        {
          heading: "5. Fees",
          body: [
            `Listing and selling are free of commission. The only fee charged by ${BRAND.name} is the withdrawal fee shown before you confirm a withdrawal, which depends on your seller level. ${BRAND.coins} purchases carry no fee.`,
          ],
        },
        {
          heading: "6. Disputes",
          body: [
            "Either party may open a dispute from the order page. Administrators review the order chat, delivery proof and account history and make a decision based on evidence. Decisions are final.",
          ],
        },
        {
          heading: "7. Affiliate program",
          body: [
            "Commission is paid only on completed orders referred through a valid link or promo code. Self-referrals, cancelled or refunded orders and promotions that violate these Terms are not paid and may be reversed.",
          ],
        },
        {
          heading: "8. Intellectual property and third-party games",
          body: [
            `Game names, logos and assets belong to their respective publishers. ${BRAND.name} is not affiliated with or endorsed by any game publisher. Users are responsible for complying with the terms of the games they trade in.`,
          ],
        },
        {
          heading: "9. Limitation of liability",
          body: [
            `To the maximum extent permitted by law, ${BRAND.name} is not liable for indirect or consequential damages, loss of virtual goods after order completion, or actions taken by game publishers against user accounts.`,
          ],
        },
        {
          heading: "10. Changes and contact",
          body: [
            "We may update these Terms. Continued use after an update constitutes acceptance. Questions about the Terms can be submitted through the Support page.",
          ],
        },
      ]}
    />
  );
}
