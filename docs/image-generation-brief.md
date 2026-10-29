# Image generation brief — Game Sector

> Task file for an image-generation model (target: **Gemini 3 Pro Image Preview, 2K**).
> Machine-readable copy of every task: `docs/image-generation-tasks.json` (same data, same order).

## 0. Summary

| Priority | Batch | Count | Why |
|---|---|---|---|
| P1 | Home hero + OG image | 2 | Visible on the first screen and in every social share |
| P1 | Game covers (`games/*`) | 46 | One cover per game feeds the market tiles, **every** listing card, game and listing page heroes, and news fallbacks — the biggest visual impact per image |
| P2 | Page heroes + 404 (`site/*`) | 4 | Seller, affiliate, about heroes and the 404 illustration |
| P2 | Seller avatars (`sellers/*`) | 10 | Shown on every listing card and seller profile |
| P2 | Merchant logo marks (`merchants/*`) | 6 | Coins merchants table |
| P3 | News covers (`news/*`) | 15 | Optional — without them articles reuse the game cover automatically |
| | **Total** | **83** | **68 required (P1+P2), 15 optional (P3)** |

No per-listing images are needed: the catalog is generated and every listing card uses its game cover.

## 1. How the site consumes images (read before generating)

* Every image has a fixed **slot path** under `public/images/`. The site scans that folder at build time
  (`npm run assets`, also runs automatically before `next build` / `next dev`) and writes `lib/asset-manifest.json`.
* If a file exists at the slot path it is rendered; if not, the page falls back to a gradient tile or an initial letter.
  So **any subset of images is safe to ship** — nothing breaks when a batch is incomplete.
* **Do not edit any `.ts` / `.tsx` file.** The only deliverable is image files at the exact paths below.
* File name = slot id + extension. Preferred extension `.webp`; `.jpg`, `.jpeg`, `.png`, `.avif` are also detected with the same basename.
  Lowercase, exactly as written (seller avatars use the lowercase handle).
* Suggested sizes after downscaling the 2K output (keeps files small): games 1600×1200, heroes 1600×1200, OG 1920×1080, news 1920×1080, avatars 512×512, merchant marks 512×512.
  Aim for < 350 KB per cover (WebP quality ~82), < 100 KB per avatar/mark.

## 2. Global style rules (apply to every prompt)

1. Original artwork only. **Never** depict real copyrighted characters, real logos, brand names or studio marks — describe the genre and mood instead (the prompts already do this).
2. **No text of any kind** inside the image: no letters, numbers, UI, captions, watermarks, signatures.
3. Palette: must sit well next to a white/light UI. Include violet / magenta / indigo accent light (`#d946ef`, `#a855f7`, `#6366f1`). Avoid muddy or fully dark images.
4. Composition: main subject inside the central 70% of the frame. Game covers are cropped to **square** on market tiles and to 4:3 / 16:10 elsewhere, so nothing important near the edges. Keep top-left and top-right corners calm (discount and server badges overlay there).
5. Consistent finish across a batch: cinematic lighting, high detail, 2K, no frames or borders, no mockups of phones/monitors around the art.

Prompt construction: `prompt = prefix + subject + suffix`. The JSON file contains the **final** prompt for every item; this document lists the subject per item (section 5) and the prefix/suffix once here:

* **style_prefix (games, site, news):** Premium digital key art for a gaming marketplace website. Original artwork only: no real game characters, no logos, no brand names, no letters, no numbers, no UI, no watermark.
* **style_suffix (games, site, news):** Cinematic lighting, rich detail, clean composition with the main subject inside the central 70% of the frame (edges will be cropped to square on some screens). Keep the top-left and top-right corners uncluttered (badges overlay there). Harmonize with a light UI: include violet / magenta / indigo accent light (hex d946ef, a855f7, 6366f1). 2K resolution.
* **avatar prefix (sellers):** Square profile avatar for a marketplace seller, friendly front-facing bust of an original stylized gamer character, semi-realistic 3D render, soft studio light, solid soft-violet gradient background (hex a855f7 to 6366f1), no text, no logos.
* **logo prefix (merchants):** Flat vector logo mark for a payment merchant, simple geometric symbol only, NO letters, NO words, NO numbers. Rounded-square tile with a violet-to-indigo gradient (hex d946ef, a855f7, 6366f1) background and a white symbol, centered, generous padding.

## 3. Execution procedure for the generating model

```
for each task in docs/image-generation-tasks.json (ordered by "order", P1 first):
    generate 1 image with task.prompt at task.aspect_ratio, 2K
    downscale to task.target_size, save as WebP (q≈82) at task.path   # create folders as needed
after each batch (or all at once):
    npm run assets        # prints "asset manifest: N image(s) under public/images"
    npm run build         # must finish with "Generating static pages (210/210)" and no errors
    git add public/images lib/asset-manifest.json
    git commit -m "Add generated artwork: <batch name>"
    git push origin main  # Vercel deploys main to production automatically
```

Acceptance per image: correct path and extension; aspect ratio matches; no text/logos; subject readable when cropped to a square; file size within limits.
Acceptance per batch: `npm run build` succeeds; pages show the images (home: hero + 8 popular market tiles; `/market/genshin-impact/accounts`: covers + seller avatars; `/coins-merchants`: marks; `/news`: covers).

## 4. Tasks

### P1 — 48 images (hero, OG, all game covers)

| # | ID | Save to | Ratio | Size | Used on |
|---|---|---|---|---|---|
| 1 | `site/home-hero` | `public/images/site/home-hero.webp` | 4:3 | 1600x1200 | Home page hero (right column, /) |
| 2 | `site/og-default` | `public/images/site/og-default.webp` | 16:9 | 1920x1080 | Open Graph / social share image (all pages) |
| 3 | `games/blood-strike` | `public/images/games/blood-strike.webp` | 4:3 | 1600x1200 | Cover for 'Blood Strike': market tile, every listing card, game page hero, listing page hero, news fallback |
| 4 | `games/mobile-legends-bang-bang` | `public/images/games/mobile-legends-bang-bang.webp` | 4:3 | 1600x1200 | Cover for 'Mobile Legends: Bang Bang': market tile, every listing card, game page hero, listing page hero, news fallback |
| 5 | `games/epic-seven` | `public/images/games/epic-seven.webp` | 4:3 | 1600x1200 | Cover for 'Epic Seven': market tile, every listing card, game page hero, listing page hero, news fallback |
| 6 | `games/arknights-endfield` | `public/images/games/arknights-endfield.webp` | 4:3 | 1600x1200 | Cover for 'Arknights: Endfield': market tile, every listing card, game page hero, listing page hero, news fallback |
| 7 | `games/genshin-impact` | `public/images/games/genshin-impact.webp` | 4:3 | 1600x1200 | Cover for 'Genshin Impact': market tile, every listing card, game page hero, listing page hero, news fallback |
| 8 | `games/honkai-star-rail` | `public/images/games/honkai-star-rail.webp` | 4:3 | 1600x1200 | Cover for 'Honkai Star Rail': market tile, every listing card, game page hero, listing page hero, news fallback |
| 9 | `games/zenless-zone-zero` | `public/images/games/zenless-zone-zero.webp` | 4:3 | 1600x1200 | Cover for 'Zenless Zone Zero': market tile, every listing card, game page hero, listing page hero, news fallback |
| 10 | `games/wuthering-waves` | `public/images/games/wuthering-waves.webp` | 4:3 | 1600x1200 | Cover for 'Wuthering Waves': market tile, every listing card, game page hero, listing page hero, news fallback |
| 11 | `games/efootball` | `public/images/games/efootball.webp` | 4:3 | 1600x1200 | Cover for 'eFootball': market tile, every listing card, game page hero, listing page hero, news fallback |
| 12 | `games/the-seven-deadly-sins-grand-cross` | `public/images/games/the-seven-deadly-sins-grand-cross.webp` | 4:3 | 1600x1200 | Cover for 'The Seven Deadly Sins: Grand Cross': market tile, every listing card, game page hero, listing page hero, news fallback |
| 13 | `games/war-thunder` | `public/images/games/war-thunder.webp` | 4:3 | 1600x1200 | Cover for 'War Thunder': market tile, every listing card, game page hero, listing page hero, news fallback |
| 14 | `games/arena-breakout` | `public/images/games/arena-breakout.webp` | 4:3 | 1600x1200 | Cover for 'Arena Breakout': market tile, every listing card, game page hero, listing page hero, news fallback |
| 15 | `games/fortnite` | `public/images/games/fortnite.webp` | 4:3 | 1600x1200 | Cover for 'Fortnite': market tile, every listing card, game page hero, listing page hero, news fallback |
| 16 | `games/maplestory-global` | `public/images/games/maplestory-global.webp` | 4:3 | 1600x1200 | Cover for 'MapleStory Global': market tile, every listing card, game page hero, listing page hero, news fallback |
| 17 | `games/brawl-stars` | `public/images/games/brawl-stars.webp` | 4:3 | 1600x1200 | Cover for 'Brawl Stars': market tile, every listing card, game page hero, listing page hero, news fallback |
| 18 | `games/neverness-to-everness` | `public/images/games/neverness-to-everness.webp` | 4:3 | 1600x1200 | Cover for 'Neverness to Everness': market tile, every listing card, game page hero, listing page hero, news fallback |
| 19 | `games/chaos-zero-nightmare` | `public/images/games/chaos-zero-nightmare.webp` | 4:3 | 1600x1200 | Cover for 'Chaos Zero Nightmare': market tile, every listing card, game page hero, listing page hero, news fallback |
| 20 | `games/roblox` | `public/images/games/roblox.webp` | 4:3 | 1600x1200 | Cover for 'Roblox': market tile, every listing card, game page hero, listing page hero, news fallback |
| 21 | `games/one-piece-bounty-rush` | `public/images/games/one-piece-bounty-rush.webp` | 4:3 | 1600x1200 | Cover for 'One Piece Bounty Rush': market tile, every listing card, game page hero, listing page hero, news fallback |
| 22 | `games/where-winds-meet` | `public/images/games/where-winds-meet.webp` | 4:3 | 1600x1200 | Cover for 'Where Winds Meet': market tile, every listing card, game page hero, listing page hero, news fallback |
| 23 | `games/league-of-legends` | `public/images/games/league-of-legends.webp` | 4:3 | 1600x1200 | Cover for 'League of Legends': market tile, every listing card, game page hero, listing page hero, news fallback |
| 24 | `games/dragon-ball-legends` | `public/images/games/dragon-ball-legends.webp` | 4:3 | 1600x1200 | Cover for 'Dragon Ball Legends': market tile, every listing card, game page hero, listing page hero, news fallback |
| 25 | `games/clash-royale` | `public/images/games/clash-royale.webp` | 4:3 | 1600x1200 | Cover for 'Clash Royale': market tile, every listing card, game page hero, listing page hero, news fallback |
| 26 | `games/bleach-brave-souls` | `public/images/games/bleach-brave-souls.webp` | 4:3 | 1600x1200 | Cover for 'Bleach: Brave Souls': market tile, every listing card, game page hero, listing page hero, news fallback |
| 27 | `games/reverse-1999` | `public/images/games/reverse-1999.webp` | 4:3 | 1600x1200 | Cover for 'Reverse: 1999': market tile, every listing card, game page hero, listing page hero, news fallback |
| 28 | `games/clash-of-clans` | `public/images/games/clash-of-clans.webp` | 4:3 | 1600x1200 | Cover for 'Clash of Clans': market tile, every listing card, game page hero, listing page hero, news fallback |
| 29 | `games/summoners-war-sky-arena` | `public/images/games/summoners-war-sky-arena.webp` | 4:3 | 1600x1200 | Cover for 'Summoners War: Sky Arena': market tile, every listing card, game page hero, listing page hero, news fallback |
| 30 | `games/arknights` | `public/images/games/arknights.webp` | 4:3 | 1600x1200 | Cover for 'Arknights': market tile, every listing card, game page hero, listing page hero, news fallback |
| 31 | `games/honor-of-kings` | `public/images/games/honor-of-kings.webp` | 4:3 | 1600x1200 | Cover for 'Honor of Kings': market tile, every listing card, game page hero, listing page hero, news fallback |
| 32 | `games/diablo-immortal` | `public/images/games/diablo-immortal.webp` | 4:3 | 1600x1200 | Cover for 'Diablo Immortal': market tile, every listing card, game page hero, listing page hero, news fallback |
| 33 | `games/last-cloudia` | `public/images/games/last-cloudia.webp` | 4:3 | 1600x1200 | Cover for 'Last Cloudia': market tile, every listing card, game page hero, listing page hero, news fallback |
| 34 | `games/yu-gi-oh-master-duel` | `public/images/games/yu-gi-oh-master-duel.webp` | 4:3 | 1600x1200 | Cover for 'Yu-Gi-Oh! Master Duel': market tile, every listing card, game page hero, listing page hero, news fallback |
| 35 | `games/punishing-gray-raven` | `public/images/games/punishing-gray-raven.webp` | 4:3 | 1600x1200 | Cover for 'Punishing: Gray Raven': market tile, every listing card, game page hero, listing page hero, news fallback |
| 36 | `games/ark-survival-ascended` | `public/images/games/ark-survival-ascended.webp` | 4:3 | 1600x1200 | Cover for 'ARK: Survival Ascended': market tile, every listing card, game page hero, listing page hero, news fallback |
| 37 | `games/seven-knights-rebirth` | `public/images/games/seven-knights-rebirth.webp` | 4:3 | 1600x1200 | Cover for 'Seven Knights Re:Birth': market tile, every listing card, game page hero, listing page hero, news fallback |
| 38 | `games/raid-shadow-legends` | `public/images/games/raid-shadow-legends.webp` | 4:3 | 1600x1200 | Cover for 'Raid: Shadow Legends': market tile, every listing card, game page hero, listing page hero, news fallback |
| 39 | `games/the-seven-deadly-sins-origin` | `public/images/games/the-seven-deadly-sins-origin.webp` | 4:3 | 1600x1200 | Cover for 'The Seven Deadly Sins: Origin': market tile, every listing card, game page hero, listing page hero, news fallback |
| 40 | `games/goddess-of-victory-nikke` | `public/images/games/goddess-of-victory-nikke.webp` | 4:3 | 1600x1200 | Cover for 'Goddess of Victory: Nikke': market tile, every listing card, game page hero, listing page hero, news fallback |
| 41 | `games/delta-force` | `public/images/games/delta-force.webp` | 4:3 | 1600x1200 | Cover for 'Delta Force': market tile, every listing card, game page hero, listing page hero, news fallback |
| 42 | `games/diablo-iv` | `public/images/games/diablo-iv.webp` | 4:3 | 1600x1200 | Cover for 'Diablo IV': market tile, every listing card, game page hero, listing page hero, news fallback |
| 43 | `games/valorant` | `public/images/games/valorant.webp` | 4:3 | 1600x1200 | Cover for 'Valorant': market tile, every listing card, game page hero, listing page hero, news fallback |
| 44 | `games/counter-strike-2` | `public/images/games/counter-strike-2.webp` | 4:3 | 1600x1200 | Cover for 'Counter-Strike 2': market tile, every listing card, game page hero, listing page hero, news fallback |
| 45 | `games/pubg-mobile` | `public/images/games/pubg-mobile.webp` | 4:3 | 1600x1200 | Cover for 'PUBG Mobile': market tile, every listing card, game page hero, listing page hero, news fallback |
| 46 | `games/free-fire` | `public/images/games/free-fire.webp` | 4:3 | 1600x1200 | Cover for 'Free Fire': market tile, every listing card, game page hero, listing page hero, news fallback |
| 47 | `games/call-of-duty-mobile` | `public/images/games/call-of-duty-mobile.webp` | 4:3 | 1600x1200 | Cover for 'Call of Duty: Mobile': market tile, every listing card, game page hero, listing page hero, news fallback |
| 48 | `games/minecraft` | `public/images/games/minecraft.webp` | 4:3 | 1600x1200 | Cover for 'Minecraft': market tile, every listing card, game page hero, listing page hero, news fallback |

### P2 — 20 images (page heroes, 404, seller avatars, merchant marks)

| # | ID | Save to | Ratio | Size | Used on |
|---|---|---|---|---|---|
| 49 | `site/seller-hero` | `public/images/site/seller-hero.webp` | 4:3 | 1600x1200 | Seller page hero (/seller) |
| 50 | `site/affiliate-hero` | `public/images/site/affiliate-hero.webp` | 4:3 | 1600x1200 | Affiliate page hero (/affiliate) |
| 51 | `site/about-hero` | `public/images/site/about-hero.webp` | 4:3 | 1600x1200 | About page hero (/about) |
| 52 | `site/not-found` | `public/images/site/not-found.webp` | 16:9 | 1600x900 | 404 page illustration |
| 53 | `sellers/gamenews` | `public/images/sellers/gamenews.webp` | 1:1 | 512x512 | Avatar of seller 'GameNews': listing cards, listing page, seller profile /seller/GameNews |
| 54 | `sellers/zone` | `public/images/sellers/zone.webp` | 1:1 | 512x512 | Avatar of seller 'Zone': listing cards, listing page, seller profile /seller/Zone |
| 55 | `sellers/lunastore` | `public/images/sellers/lunastore.webp` | 1:1 | 512x512 | Avatar of seller 'LunaStore': listing cards, listing page, seller profile /seller/LunaStore |
| 56 | `sellers/arcadiashop` | `public/images/sellers/arcadiashop.webp` | 1:1 | 512x512 | Avatar of seller 'ArcadiaShop': listing cards, listing page, seller profile /seller/ArcadiaShop |
| 57 | `sellers/pixelvault` | `public/images/sellers/pixelvault.webp` | 1:1 | 512x512 | Avatar of seller 'PixelVault': listing cards, listing page, seller profile /seller/PixelVault |
| 58 | `sellers/novaboost` | `public/images/sellers/novaboost.webp` | 1:1 | 512x512 | Avatar of seller 'NovaBoost': listing cards, listing page, seller profile /seller/NovaBoost |
| 59 | `sellers/topupking` | `public/images/sellers/topupking.webp` | 1:1 | 512x512 | Avatar of seller 'TopUpKing': listing cards, listing page, seller profile /seller/TopUpKing |
| 60 | `sellers/kairo` | `public/images/sellers/kairo.webp` | 1:1 | 512x512 | Avatar of seller 'Kairo': listing cards, listing page, seller profile /seller/Kairo |
| 61 | `sellers/queenbee` | `public/images/sellers/queenbee.webp` | 1:1 | 512x512 | Avatar of seller 'QueenBee': listing cards, listing page, seller profile /seller/QueenBee |
| 62 | `sellers/mythicdealer` | `public/images/sellers/mythicdealer.webp` | 1:1 | 512x512 | Avatar of seller 'MythicDealer': listing cards, listing page, seller profile /seller/MythicDealer |
| 63 | `merchants/coinhub-asia` | `public/images/merchants/coinhub-asia.webp` | 1:1 | 512x512 | Logo mark of merchant 'CoinHub Asia' on /coins-merchants |
| 64 | `merchants/eurotopup` | `public/images/merchants/eurotopup.webp` | 1:1 | 512x512 | Logo mark of merchant 'EuroTopUp' on /coins-merchants |
| 65 | `merchants/latampay-coins` | `public/images/merchants/latampay-coins.webp` | 1:1 | 512x512 | Logo mark of merchant 'LatamPay Coins' on /coins-merchants |
| 66 | `merchants/desert-coins` | `public/images/merchants/desert-coins.webp` | 1:1 | 512x512 | Logo mark of merchant 'Desert Coins' on /coins-merchants |
| 67 | `merchants/cryptobridge` | `public/images/merchants/cryptobridge.webp` | 1:1 | 512x512 | Logo mark of merchant 'CryptoBridge' on /coins-merchants |
| 68 | `merchants/sea-wallet` | `public/images/merchants/sea-wallet.webp` | 1:1 | 512x512 | Logo mark of merchant 'SEA Wallet' on /coins-merchants |

### P3 — 15 images (news covers, optional)

| # | ID | Save to | Ratio | Size | Used on |
|---|---|---|---|---|---|
| 69 | `news/hsr-relic-crafting-self-modeling-resin` | `public/images/news/hsr-relic-crafting-self-modeling-resin.webp` | 16:9 | 1920x1080 | Article cover for /news/hsr-relic-crafting-self-modeling-resin (news list, home news block). If skipped, the game cover games/honkai-star-rail is used. |
| 70 | `news/nikke-4th-anniversary-new-ssrs` | `public/images/news/nikke-4th-anniversary-new-ssrs.webp` | 16:9 | 1920x1080 | Article cover for /news/nikke-4th-anniversary-new-ssrs (news list, home news block). If skipped, the game cover games/goddess-of-victory-nikke is used. |
| 71 | `news/7ds-origin-2-3-bonus-lock-greed-incarnate-estia` | `public/images/news/7ds-origin-2-3-bonus-lock-greed-incarnate-estia.webp` | 16:9 | 1920x1080 | Article cover for /news/7ds-origin-2-3-bonus-lock-greed-incarnate-estia (news list, home news block). If skipped, the game cover games/the-seven-deadly-sins-origin is used. |
| 72 | `news/delta-force-ravens-deal-halloween-rewards` | `public/images/news/delta-force-ravens-deal-halloween-rewards.webp` | 16:9 | 1920x1080 | Article cover for /news/delta-force-ravens-deal-halloween-rewards (news list, home news block). If skipped, the game cover games/delta-force is used. |
| 73 | `news/diablo-iv-season-16-ptr` | `public/images/news/diablo-iv-season-16-ptr.webp` | 16:9 | 1920x1080 | Article cover for /news/diablo-iv-season-16-ptr (news list, home news block). If skipped, the game cover games/diablo-iv is used. |
| 74 | `news/world-war-z-viral-state-florida-update` | `public/images/news/world-war-z-viral-state-florida-update.webp` | 16:9 | 1920x1080 | Article cover for /news/world-war-z-viral-state-florida-update (news list, home news block). If skipped, the game cover games/world-war-z-aftermath is used. |
| 75 | `news/genshin-impact-overflowing-favor-double-artifact-drops` | `public/images/news/genshin-impact-overflowing-favor-double-artifact-drops.webp` | 16:9 | 1920x1080 | Article cover for /news/genshin-impact-overflowing-favor-double-artifact-drops (news list, home news block). If skipped, the game cover games/genshin-impact is used. |
| 76 | `news/arena-breakout-infinite-halloween-mysterious-night` | `public/images/news/arena-breakout-infinite-halloween-mysterious-night.webp` | 16:9 | 1920x1080 | Article cover for /news/arena-breakout-infinite-halloween-mysterious-night (news list, home news block). If skipped, the game cover games/arena-breakout is used. |
| 77 | `news/reverse-1999-3-9-hedone-narcissus-free-summons` | `public/images/news/reverse-1999-3-9-hedone-narcissus-free-summons.webp` | 16:9 | 1920x1080 | Article cover for /news/reverse-1999-3-9-hedone-narcissus-free-summons (news list, home news block). If skipped, the game cover games/reverse-1999 is used. |
| 78 | `news/zzz-cyber-miracle-healer-free-polychromes` | `public/images/news/zzz-cyber-miracle-healer-free-polychromes.webp` | 16:9 | 1920x1080 | Article cover for /news/zzz-cyber-miracle-healer-free-polychromes (news list, home news block). If skipped, the game cover games/zenless-zone-zero is used. |
| 79 | `news/fortnite-final-spritemare-daily-boosts` | `public/images/news/fortnite-final-spritemare-daily-boosts.webp` | 16:9 | 1920x1080 | Article cover for /news/fortnite-final-spritemare-daily-boosts (news list, home news block). If skipped, the game cover games/fortnite is used. |
| 80 | `news/efootball-epic-italian-league-attackers` | `public/images/news/efootball-epic-italian-league-attackers.webp` | 16:9 | 1920x1080 | Article cover for /news/efootball-epic-italian-league-attackers (news list, home news block). If skipped, the game cover games/efootball is used. |
| 81 | `news/wuthering-waves-2-8-phrolova-banner-guide` | `public/images/news/wuthering-waves-2-8-phrolova-banner-guide.webp` | 16:9 | 1920x1080 | Article cover for /news/wuthering-waves-2-8-phrolova-banner-guide (news list, home news block). If skipped, the game cover games/wuthering-waves is used. |
| 82 | `news/mlbb-m8-world-championship-skins` | `public/images/news/mlbb-m8-world-championship-skins.webp` | 16:9 | 1920x1080 | Article cover for /news/mlbb-m8-world-championship-skins (news list, home news block). If skipped, the game cover games/mobile-legends-bang-bang is used. |
| 83 | `news/epic-seven-ml-kayron-rerun` | `public/images/news/epic-seven-ml-kayron-rerun.webp` | 16:9 | 1920x1080 | Article cover for /news/epic-seven-ml-kayron-rerun (news list, home news block). If skipped, the game cover games/epic-seven is used. |

## 5. Subjects (per item, combine with prefix/suffix as described above)

**1. `site/home-hero`** (4:3) — Floating isometric composition of marketplace objects: holographic account cards, a glowing shield, a game controller, gold coins and a chat bubble, arranged on a soft white background lit by violet-magenta-indigo gradient light; clean premium 3D render.

**2. `site/og-default`** (16:9) — Wide social banner: abstract composition of a glowing shield, a game controller, holographic cards and coins on a white background with violet-magenta-indigo gradient glows; leave the left third of the frame almost empty (text will be overlaid later).

**3. `games/blood-strike`** (4:3) — Mobile battle-royale shooter: a lone operator in futuristic tactical gear sprinting across a neon-lit rooftop at dusk while a shrinking violet energy dome glows on the horizon, supply pods dropping, dynamic low angle.

**4. `games/mobile-legends-bang-bang`** (4:3) — Fantasy MOBA arena: three stylized hero silhouettes clashing on a glowing jungle lane between ancient ruins, spell effects in magenta and indigo, a crystal turret in the background.

**5. `games/epic-seven`** (4:3) — Anime-style fantasy RPG: a party of original heroes with ornate weapons standing on a floating sky island, celestial light rays, cel-shaded painterly look.

**6. `games/arknights-endfield`** (4:3) — Sci-fi 3D RPG frontier: an industrial outpost with conveyor belts and energy pylons on an alien plateau under a violet twilight sky, a lone operator with a long rifle in the foreground.

**7. `games/genshin-impact`** (4:3) — Anime open-world fantasy vista: wind-swept cliffs with a giant ancient glowing tree, floating elemental crystals, a traveler gliding with a wing glider, golden hour blending into a violet sky.

**8. `games/honkai-star-rail`** (4:3) — Space-fantasy RPG: a sleek interstellar train gliding along a glowing rail through a nebula of violet and gold, distant planets, anime painterly style.

**9. `games/zenless-zone-zero`** (4:3) — Stylish urban action RPG: a neon-soaked futuristic street at night with blank holographic billboards, a cute round robot mascot creature in the foreground, graffiti textures, magenta and cyan glow.

**10. `games/wuthering-waves`** (4:3) — Open-world action RPG: a warrior in a flowing coat leaping across floating stone ruins while visible sound-wave ripples echo through the air, stormy violet sky, dramatic motion.

**11. `games/efootball`** (4:3) — Football simulation: a striker in a plain unbranded kit volleying the ball inside a packed night stadium, floodlights, motion blur, stylized realistic render.

**12. `games/the-seven-deadly-sins-grand-cross`** (4:3) — Anime medieval fantasy: seven knight silhouettes with glowing abstract emblems standing before a grand castle, dramatic clouds, cel-shaded.

**13. `games/war-thunder`** (4:3) — Military vehicle combat: a WWII-era fighter plane diving over a tank column crossing a river at dawn, a warship on the horizon, realistic painterly style.

**14. `games/arena-breakout`** (4:3) — Hardcore extraction shooter: an operator with a heavy backpack and night-vision goggles moving through a ruined warehouse, flashlight beams cutting through dust, tense atmosphere.

**15. `games/fortnite`** (4:3) — Vibrant stylized battle royale: a cartoon-proportioned character gliding from a colorful flying bus-like airship over a bright island with quirky buildings, saturated playful palette.

**16. `games/maplestory-global`** (4:3) — Classic 2D side-scrolling MMORPG feel: a chibi adventurer with an oversized sword on a mushroom-forest platform, floating islands, pixel-inspired shapes rendered in high-res painterly style.

**17. `games/brawl-stars`** (4:3) — 3v3 hero-shooter arena: chunky cartoon brawlers in a desert canyon arena with a glowing gem mine in the center, bold outlines, toy-like 3D render.

**18. `games/neverness-to-everness`** (4:3) — Supernatural urban open world: a glowing city street at night, a sports car drifting past anomaly rifts in the sky, cherry blossoms, anime render.

**19. `games/chaos-zero-nightmare`** (4:3) — Roguelike deck-building RPG: anime heroes in a shattered dreamscape with floating blank tarot-like cards, dark violet mist, chaotic portals.

**20. `games/roblox`** (4:3) — Blocky sandbox platform: a cheerful blocky avatar with a top hat in front of a colorful voxel city with many mini-worlds floating behind, playful 3D render.

**21. `games/one-piece-bounty-rush`** (4:3) — Pirate anime 4v4 battle: an original straw-hatted pirate silhouette and crew grabbing a treasure chest on a tropical beach, cannon smoke, shonen anime style.

**22. `games/where-winds-meet`** (4:3) — Wuxia open world: a martial artist in flowing robes leaping across misty bamboo-forest rooftops of an ancient Chinese city, lanterns, ink-wash atmosphere.

**23. `games/league-of-legends`** (4:3) — PC MOBA splash art: an original champion with a glowing spear on a crystalline arena platform, rift energy swirling, painterly splash-art style.

**24. `games/dragon-ball-legends`** (4:3) — Martial-arts fighting game: two original spiky-haired fighters clashing mid-air with blazing energy auras, shattered rocks, shonen anime style.

**25. `games/clash-royale`** (4:3) — Real-time card strategy: a miniature battle arena with two towers and tiny cartoon troops charging across a bridge, a glowing blank card floating above, toy-like 3D.

**26. `games/bleach-brave-souls`** (4:3) — Soul-reaper action: a black-robed swordsman with an oversized katana releasing a wave of spirit energy in a moonlit town, anime style.

**27. `games/reverse-1999`** (4:3) — Time-reversing turn-based RPG: a 1920s-dressed arcanist with an umbrella on a street where raindrops fall upward and clocks melt, vintage color grading with violet accents.

**28. `games/clash-of-clans`** (4:3) — Village-builder strategy: a fortified fantasy village with walls, cannons and a town hall seen from a high angle, a barbarian army approaching, cartoon 3D.

**29. `games/summoners-war-sky-arena`** (4:3) — Monster-collecting RPG: a summoner raising a glowing rune circle as elemental creatures emerge, floating sky arena, painterly fantasy.

**30. `games/arknights`** (4:3) — Tower-defense RPG: operators in tactical coats holding a rooftop chokepoint against shadowy figures, subtly glowing grid tiles on the floor, anime style.

**31. `games/honor-of-kings`** (4:3) — Mobile MOBA with Chinese-mythology flavor: a warrior in ornate armor wielding a glowing halberd before a celestial palace, red and violet energy.

**32. `games/diablo-immortal`** (4:3) — Dark gothic action RPG: a demon hunter with twin crossbows in a hellish cathedral, embers and glowing legendary gems, isometric-inspired angle.

**33. `games/last-cloudia`** (4:3) — Fantasy RPG: a knight and a mage facing a giant crystal ark floating in the sky, a blend of pixel textures and painterly light.

**34. `games/yu-gi-oh-master-duel`** (4:3) — Digital card dueling: a duelist on a holographic arena summoning a dragon out of a glowing blank card, futuristic stadium.

**35. `games/punishing-gray-raven`** (4:3) — Sci-fi action RPG: a cyborg warrior with a glowing blade in a ruined futuristic city under a corrupted red-violet sky, fast motion.

**36. `games/ark-survival-ascended`** (4:3) — Dinosaur survival: a survivor riding an armored T-rex through a jungle toward a glowing obelisk tower, prehistoric creatures, cinematic realism.

**37. `games/seven-knights-rebirth`** (4:3) — Hero-collector RPG: seven original armored knights posing in formation on a cliff under a stormy sky, 3D anime render.

**38. `games/raid-shadow-legends`** (4:3) — Dark fantasy collection RPG: champions of several factions assembled in a ruined castle hall, dramatic torchlight, realistic painterly.

**39. `games/the-seven-deadly-sins-origin`** (4:3) — Open-world action RPG: a young knight overlooking a vast green valley with a giant tree and floating islands, anime open-world style.

**40. `games/goddess-of-victory-nikke`** (4:3) — Third-person shooter RPG: a squad of original android soldiers firing from cover on a ruined rooftop at a towering mechanical monster, dramatic lighting.

**41. `games/delta-force`** (4:3) — Modern military shooter: operators in night-ops gear boarding a helicopter during a desert raid, dust and tracer fire, realistic render.

**42. `games/diablo-iv`** (4:3) — Dark fantasy ARPG: a sorceress casting lightning in a blood-red cathedral against a horde of demons, embers, grim realism.

**43. `games/valorant`** (4:3) — Tactical hero shooter: stylized agents using smoke and wall abilities on a sunlit Mediterranean-style map, bold graphic shading.

**44. `games/counter-strike-2`** (4:3) — Tactical shooter: operators stacking at a door in a dusty Middle-Eastern-style map, realistic lighting, rifles with abstract pattern skins.

**45. `games/pubg-mobile`** (4:3) — Mobile battle royale: a player wearing a heavy helmet landing by parachute on a military island, a frying pan on the back, cinematic realism.

**46. `games/free-fire`** (4:3) — Mobile battle royale: a stylized character with a glowing evolving rifle on a tropical island, a translucent safe-zone wall approaching, vibrant colors.

**47. `games/call-of-duty-mobile`** (4:3) — Mobile shooter: a soldier with a mythic-glow weapon in a suburban test-site map, explosion in the background, action render.

**48. `games/minecraft`** (4:3) — Voxel sandbox: a blocky landscape with a cube-built castle, blocky creatures, a square sun setting, iconic cube aesthetic in an original design.

**49. `site/seller-hero`** (4:3) — Isometric 3D scene of a seller desk: a laptop showing abstract blank charts, stacks of coins turning into crypto tokens, a parcel with a glowing check mark, soft white background, violet gradient lighting.

**50. `site/affiliate-hero`** (4:3) — 3D render of a smartphone emitting a glowing share-link ribbon that branches to many small avatar bubbles, coins flowing back toward the phone, soft white background, violet-indigo gradient.

**51. `site/about-hero`** (4:3) — A globe made of glowing network nodes connecting gamer avatars across continents, controllers and shields orbiting it, white background, violet-magenta light.

**52. `site/not-found`** (16:9) — A cute round robot mascot in violet gradient colors looking puzzled at an empty gaming chair in a bright minimal lobby, soft white background, minimal 3D render.

**53. `sellers/gamenews`** (1:1) — Character: news-anchor style with a gaming headset and a small microphone, confident smile.

**54. `sellers/zone`** (1:1) — Character: sleek character with a glowing geometric visor, cool indigo tones.

**55. `sellers/lunastore`** (1:1) — Character: pastel-toned character with a crescent-moon hair accessory, calm expression.

**56. `sellers/arcadiashop`** (1:1) — Character: retro-arcade themed character with pixel-shaped sunglasses, neon magenta accents.

**57. `sellers/pixelvault`** (1:1) — Character: character in a pixel-pattern hoodie with a small vault-door badge on the chest.

**58. `sellers/novaboost`** (1:1) — Character: energetic character with rocket-flame styled hair, dynamic lighting.

**59. `sellers/topupking`** (1:1) — Character: character wearing a small golden crown, holding a shiny gold coin.

**60. `sellers/kairo`** (1:1) — Character: calm character with a baseball cap, teal accent details.

**61. `sellers/queenbee`** (1:1) — Character: character in a black-and-yellow striped hoodie with a honeycomb accent.

**62. `sellers/mythicdealer`** (1:1) — Character: hooded merchant character with a glowing violet mythic gem pendant.

**63. `merchants/coinhub-asia`** (1:1) — Symbol: a coin shape in the middle with hub lines radiating to six small nodes.

**64. `merchants/eurotopup`** (1:1) — Symbol: a coin with a bold upward arrow.

**65. `merchants/latampay-coins`** (1:1) — Symbol: a rising sun half-circle above a coin.

**66. `merchants/desert-coins`** (1:1) — Symbol: two smooth sand dunes with a coin rising like a sun.

**67. `merchants/cryptobridge`** (1:1) — Symbol: an arched bridge made of two linked chain segments.

**68. `merchants/sea-wallet`** (1:1) — Symbol: a wallet silhouette with a wave cutting across it.

**69. `news/hsr-relic-crafting-self-modeling-resin`** (16:9) — Editorial news illustration: a glowing relic artifact being forged inside a cosmic workshop with floating resin orbs, anime sci-fi.

**70. `news/nikke-4th-anniversary-new-ssrs`** (16:9) — Editorial news illustration: anniversary fireworks over a futuristic base with three silhouetted android soldiers striking poses.

**71. `news/7ds-origin-2-3-bonus-lock-greed-incarnate-estia`** (16:9) — Editorial news illustration: a glowing padlock icon hovering over a weapon forge inside a fantasy kingdom, fire mage silhouette in the background.

**72. `news/delta-force-ravens-deal-halloween-rewards`** (16:9) — Editorial news illustration: a military outpost decorated with jack-o-lanterns at night, a raven perched on a supply crate, eerie fog.

**73. `news/diablo-iv-season-16-ptr`** (16:9) — Editorial news illustration: golden angelic feathers drifting down into a dark gothic cathedral, demons lurking in the shadows.

**74. `news/world-war-z-viral-state-florida-update`** (16:9) — Editorial news illustration: a zombie horde surging through a flooded sunny suburb with palm trees and a distant theme-park ferris wheel.

**75. `news/genshin-impact-overflowing-favor-double-artifact-drops`** (16:9) — Editorial news illustration: a treasure chest overflowing with glowing artifacts inside a fantasy domain of stone pillars and elemental light.

**76. `news/arena-breakout-infinite-halloween-mysterious-night`** (16:9) — Editorial news illustration: a night raid through a foggy farm with glowing pumpkins, a looming boss figure silhouetted against the moon.

**77. `news/reverse-1999-3-9-hedone-narcissus-free-summons`** (16:9) — Editorial news illustration: a 1920s seaside summer festival with vintage boats on a golden sea, raindrops falling upward, retro color grading.

**78. `news/zzz-cyber-miracle-healer-free-polychromes`** (16:9) — Editorial news illustration: cute round robot mascot creatures being repaired on a neon-lit workbench, sparks and holographic tools.

**79. `news/fortnite-final-spritemare-daily-boosts`** (16:9) — Editorial news illustration: a cartoon spooky forest at night filled with glowing floating sprites, Halloween orange and violet palette.

**80. `news/efootball-epic-italian-league-attackers`** (16:9) — Editorial news illustration: three retro-era football stars in plain blue kits celebrating in a stadium, vintage film grain.

**81. `news/wuthering-waves-2-8-phrolova-banner-guide`** (16:9) — Editorial news illustration: a dark-coat warrior surrounded by purple sound waves over a dreamlike lost landscape, stormy sky.

**82. `news/mlbb-m8-world-championship-skins`** (16:9) — Editorial news illustration: an esports world-championship stage with a glowing trophy, confetti and stage lights, no text on screens.

**83. `news/epic-seven-ml-kayron-rerun`** (16:9) — Editorial news illustration: a moonlit anime swordsman with dark feathered wings standing on a gothic rooftop.

