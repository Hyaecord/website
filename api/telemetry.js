// Receives the Hyaecord client's anonymous usage pings.
//
// Payload (JSON): { kind, id, version, os, arch, de, ... }
//   kind    "ping" (daily) or "event"
//   id      random UUID generated client-side, never linked to a Discord account
//
// Storage backend is not decided yet ([OPEN] in the main repo's BUILD_PROMPT):
// until it is, pings are validated and discarded. The IP address is never
// logged or stored by this function; Vercel's transient platform logs are
// covered by the privacy policy.

const MAX_BODY = 2048;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const body = req.body;
  const valid =
    body &&
    typeof body === "object" &&
    JSON.stringify(body).length <= MAX_BODY &&
    (body.kind === "ping" || body.kind === "event") &&
    typeof body.id === "string" &&
    /^[0-9a-f-]{36}$/i.test(body.id);

  if (!valid) {
    res.status(400).end();
    return;
  }

  // TODO: aggregate into the chosen storage backend (Vercel KV / Cloudflare D1 /
  // self-hosted) once that decision is made. Count unique `id`s per day for the
  // "how many users" number; group by version/os/de for platform breakdowns.

  res.status(204).end();
}
