// Latest 2 GitHub Releases of litepodsh/litepod, rendered by GitHub itself (`body_html`).
const API = "https://api.github.com/repos/litepodsh/litepod/releases?per_page=10";
const TTL = 10 * 60 * 1000;

let cache = { at: 0, releases: [] };

/** Cached for 10 min; on a GitHub error (or rate limit) serves the last good copy. */
export async function getReleases() {
  if (Date.now() - cache.at < TTL) return cache.releases;
  try {
    const res = await fetch(API, {
      headers: {
        Accept: "application/vnd.github.html+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const all = await res.json();
    cache = { at: Date.now(), releases: all.filter((r) => !r.draft && !r.prerelease).slice(0, 2) };
  } catch {
    // Back off for a minute so a GitHub outage does not add 5 s to every visit.
    cache = { ...cache, at: Date.now() - TTL + 60 * 1000 };
  }
  return cache.releases;
}
