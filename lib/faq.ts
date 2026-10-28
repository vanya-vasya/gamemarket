import { BRAND } from "./brand";

export type QA = { q: string; a: string };
export type FaqGroup = { slug: string; title: string; audience: "For buyers" | "For sellers" | "Everyone"; items: QA[] };

export const MOST_ASKED: QA[] = [
  {
    q: `How does ${BRAND.name} work?`,
    a: `${BRAND.name} operates as a secure digital marketplace where gamers can buy and sell digital products. Buyers browse verified listings, pay with any supported method and receive their digital assets securely. Every transaction is protected through ${BRAND.protection} to ensure safety and peace of mind for all users.`,
  },
  {
    q: `How can I contact ${BRAND.name} support?`,
    a: "Submit a request on the Support page. Our team replies around the clock and every request receives a ticket number you can track from your account.",
  },
  {
    q: `What is ${BRAND.coins}?`,
    a: `${BRAND.coins} is a special currency used for instant transactions within ${BRAND.name} without any fees. ${BRAND.coins} cannot be withdrawn or converted into real money and is exclusively valid for purchases on ${BRAND.name}.`,
  },
  {
    q: `How do I sell products on ${BRAND.name}?`,
    a: `Before you can sell on ${BRAND.name}, you must verify your identity and reliability as a seller. Verification lives on a single settings page and ensures that only trusted sellers can list products on the marketplace.`,
  },
  {
    q: 'What is "Overall Review Rating"?',
    a: `Overall Review Rating is the combined total feedback from all markets a seller is active in. Market-Specific Feedback applies to individual sections, while Overall Review Rating represents a seller's reputation across ${BRAND.name} as a whole.`,
  },
  {
    q: "I want a new market section. What should I do?",
    a: `Submit a request through the Support page. Every request is carefully reviewed, and if the community needs a new market section we do our best to make it happen.`,
  },
];

export const FAQ_GROUPS: FaqGroup[] = [
  {
    slug: "buying-orders",
    title: "Buying & Orders",
    audience: "For buyers",
    items: [
      { q: "How do I place an order?", a: "Open a listing, choose the quantity and press Buy now. After payment the order chat opens automatically and the seller is notified." },
      { q: "Where can I see my orders?", a: "All running and completed orders are listed under Orders in the top navigation. Each order has its own chat and a status timeline." },
      { q: "How long does delivery take?", a: "Every listing shows an estimated delivery time. Account and top-up orders are usually delivered within minutes; boosting orders show a completion window in days." },
      { q: "What happens if the seller does not respond?", a: "If the seller does not deliver within the stated time you can cancel the order for a full refund or open a dispute from the order page." },
      { q: "Can I negotiate the price?", a: "Yes. Use the regular chat room to talk to the seller before buying. Sellers can edit the price or create a custom offer." },
      { q: "Can I buy from several sellers at once?", a: "Each order is tied to one seller, but you can run as many orders in parallel as you like." },
      { q: "What is the order code?", a: "Every order gets a short unique code shown on the order page. Quote it when you contact support." },
      { q: "How do I confirm an order?", a: "Once you have checked the delivered item, press Complete order. Funds are then released to the seller." },
      { q: "What if I forget to confirm?", a: "Orders without a response are completed automatically after a set period, so sellers are never left waiting forever." },
      { q: "Can I leave a review?", a: "Yes, every completed order lets you rate the seller in that specific market and leave a written review." },
    ],
  },
  {
    slug: "buyer-protection-safety",
    title: "Buyer Protection & Safety",
    audience: "For buyers",
    items: [
      { q: `What is ${BRAND.protection}?`, a: "Your payment is held by the platform until you confirm the order. Sellers never receive funds before you have the item." },
      { q: "How do I open a dispute?", a: "On the order page press Report a problem. Attach screenshots, describe the issue and an admin reviews the order chat as evidence." },
      { q: "Is it safe to share my account details with a booster?", a: "Share details only inside the order chat, never in the regular chat or outside the platform. Change your password after the order completes." },
      { q: "What should I never do?", a: "Never pay outside the platform, never accept delivery outside the order chat and never share one-time codes with anyone." },
      { q: "How are sellers verified?", a: "Sellers submit identity documents and pass a reliability check before their first listing goes live. Verified sellers show a badge." },
      { q: "What does the blue check mean?", a: "The blue check is awarded to Pro Sellers with 1,000+ completed sales and a consistent rating." },
      { q: "Are reviews real?", a: "Reviews can only be left after a completed order, so every rating is tied to a real transaction." },
      { q: "What if the account gets recovered by the previous owner?", a: "Listings with a warranty period cover this scenario. Open a dispute within the warranty and support steps in." },
      { q: "Can I get scammed through the chat?", a: "Chat history is stored and counts as evidence. Anything agreed in the order chat is enforceable in a dispute." },
    ],
  },
  {
    slug: "payments-refunds",
    title: "Payments & Refunds",
    audience: "For buyers",
    items: [
      { q: "Which payment methods are supported?", a: `Cards, local bank transfers, e-wallets, crypto and ${BRAND.coins}. Available methods depend on your region and are shown at checkout.` },
      { q: "Are there buyer fees?", a: `${BRAND.coins} payments are free. Other methods may carry a small processing fee that is displayed before you confirm.` },
      { q: "How do refunds work?", a: "Refunds for cancelled or disputed orders return to your balance instantly and can be withdrawn or reused." },
      { q: "Can I pay in my local currency?", a: "Yes. Prices are shown in your chosen currency and converted at checkout." },
      { q: "Why was my payment declined?", a: "Most declines come from the card issuer. Try another method or contact your bank." },
      { q: "Do I need an account to buy?", a: "Yes. An account keeps your orders, chats and buyer protection in one place." },
    ],
  },
  {
    slug: "selling-listings",
    title: "Selling & Listings",
    audience: "For sellers",
    items: [
      { q: "What can I sell?", a: "Game accounts, boosting, hourly services, top ups, in-game currency and items across every game on the marketplace." },
      { q: "How do I create a listing?", a: "Pick the game and category, fill in the essentials, upload up to 50 images and set your price. It goes live instantly." },
      { q: "Can I edit a listing?", a: "Yes. Price, stock, images and description can be changed at any time without re-approval." },
      { q: "How many listings can I post?", a: "There is no limit and listings are free." },
      { q: "What are account tiers?", a: "Starter, Mid Game, End Game, Reroll, Whale and Others. Choose the one that best describes the account so buyers can filter." },
      { q: "How do images get protected?", a: "Every image is auto-watermarked with a link to your profile." },
      { q: "What is the affiliate rate on a listing?", a: "The share of the sale price you give to anyone who refers a buyer. Set it between 1% and 50% or leave it off." },
      { q: "Can I sell in multiple games?", a: "Yes. One verification covers every game and category." },
      { q: "How do I handle a custom order?", a: "Create a custom offer from the chat with the buyer. It becomes a normal protected order." },
      { q: "What is delivery proof?", a: "Screenshots or files uploaded in the order chat that show the order was delivered. They are used in disputes." },
      { q: "Why is my listing hidden?", a: "Listings with zero stock or pending moderation are hidden automatically. Check the listing status in your dashboard." },
    ],
  },
  {
    slug: "withdrawals-earnings",
    title: "Withdrawals & Earnings",
    audience: "For sellers",
    items: [
      { q: "When do I get paid?", a: "The moment the buyer marks the order complete, funds land in your balance automatically." },
      { q: "How do I withdraw?", a: "Request a withdrawal from the dashboard via crypto or bank transfer and track its status in Statement." },
      { q: "What are the fees?", a: "Sales commission is 0%. The only fee is the withdrawal fee, which starts at 4.99% and drops to 0.99% as your seller level rises." },
    ],
  },
  {
    slug: "seller-rules-penalties",
    title: "Seller Rules & Penalties",
    audience: "For sellers",
    items: [
      { q: "What leads to a ban?", a: "Off-platform trading, multiple accounts, fake listings and chargeback abuse all result in a permanent ban." },
      { q: "Can I cancel an order?", a: "Yes, but repeated cancellations lower your rating and can pause your listings." },
      { q: "What if the buyer is unresponsive?", a: "Orders complete automatically after the set period if delivery proof has been uploaded." },
      { q: "What counts as a fraudulent claim?", a: "Claims contradicted by the order chat or delivery proof are rejected and may penalize the buyer." },
      { q: "How are disputes decided?", a: "Admins review chat history and proof and decide on clear evidence. Decisions are final." },
    ],
  },
  {
    slug: "getting-started",
    title: "Getting Started",
    audience: "Everyone",
    items: [
      { q: "How do I create an account?", a: "Press Sign up, confirm your email and you are ready to buy. Selling requires an additional verification step." },
      { q: "Is the marketplace free to use?", a: "Browsing, buying and listing are free. Sellers pay only a withdrawal fee." },
      { q: "Which games are supported?", a: `More than ${BRAND.stats.games.toLocaleString("en-US")} games and growing. Use the Markets page to browse them A–Z.` },
      { q: "Is there a mobile app?", a: "The website is fully responsive and works on any phone. Native apps are on the roadmap." },
      { q: "What are the account tiers?", a: "A tier describes how far an account has progressed: Starter, Mid Game, End Game, Reroll, Whale or Others." },
      { q: "What is a market section?", a: "A game and category pair, for example Genshin Impact → Accounts. Reviews are tracked per market section." },
      { q: "Can I change my username?", a: "Yes, once every 30 days from Account settings." },
      { q: "How do notifications work?", a: "Order updates, chat messages and disputes trigger notifications in the app and by email." },
      { q: "Which languages are supported?", a: "The interface is in English; sellers and buyers chat in any language." },
      { q: "Where do I find news and guides?", a: "The News section publishes patch notes, event guides and market updates every day." },
    ],
  },
  {
    slug: "account-security",
    title: "Account & Security",
    audience: "Everyone",
    items: [
      { q: "How do I enable two-factor authentication?", a: "Go to Account → Security and link an authenticator app." },
      { q: "I forgot my password.", a: "Use Forgot password on the sign-in page to receive a reset link." },
      { q: "Can I delete my account?", a: "Yes, from Account settings once all orders are complete and your balance is withdrawn." },
      { q: "How is my data protected?", a: "Data is encrypted in transit and at rest. See the Privacy Policy for full details." },
    ],
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    audience: "Everyone",
    items: [
      { q: "The page does not load.", a: "Clear the browser cache or try a private window. If the issue persists, contact support with a screenshot." },
      { q: "I did not receive the verification email.", a: "Check spam and make sure the address is correct. Resend from the sign-in page." },
      { q: "The chat is not updating.", a: "Refresh the page. Chats reconnect automatically when the network is restored." },
    ],
  },
];

export const totalAnswers = () =>
  MOST_ASKED.length + FAQ_GROUPS.reduce((sum, group) => sum + group.items.length, 0);
