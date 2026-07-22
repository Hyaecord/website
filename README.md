# Hyaecord Website

The [Hyaecord](https://github.com/Hyaecord/hyaecord) project website, deployed on Vercel at
[hyaecord.vercel.app](https://hyaecord.vercel.app).

## Structure

- `index.html` — static landing page (no framework, no build step).
- `docs.html` — documentation/wiki hub with FAQ.
- `privacy.html` / `legal.html` — privacy policy and legal notices.
- `llms.txt` — machine-readable project summary for LLMs and crawlers.
- `.well-known/security.txt` — RFC 9116 security contact.
- `robots.txt` / `sitemap.xml` / `404.html` — the usual site plumbing.
- `assets/logo.svg` — branding, copied from the main repo's `assets/branding/`.
- `api/discord.js` — serverless function backing the `/discord` redirect.
- `vercel.json` — rewrites `/discord` to the function.

## The `/discord` redirect

[hyaecord.vercel.app/discord](https://hyaecord.vercel.app/discord) fetches the Discord
server widget (`https://discord.com/api/guilds/1529521295228928000/widget.json`) at
request time and 302-redirects to its `instant_invite`, so the link keeps working even
if the widget invite rotates. A last-known invite is hardcoded as a fallback for when
the widget fetch fails.

**This requires Server Widget to stay enabled** in the Discord server settings
(Server Settings → Widget → Enable Server Widget, with an invite channel selected).
If the widget is disabled, the redirect falls back to the hardcoded invite, which may
expire.
