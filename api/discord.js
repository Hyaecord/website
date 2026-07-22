const GUILD_ID = "1529521295228928000";
// Last-known invite, used only if the widget fetch fails.
const FALLBACK_INVITE = "https://discord.com/invite/vhXNzJxV";

export default async function handler(req, res) {
  let invite = FALLBACK_INVITE;
  try {
    const r = await fetch(
      `https://discord.com/api/guilds/${GUILD_ID}/widget.json`
    );
    if (r.ok) {
      const data = await r.json();
      if (data.instant_invite) invite = data.instant_invite;
    }
  } catch {
    // fall through to the fallback invite
  }
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  res.redirect(302, invite);
}
