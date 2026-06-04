// ─── Site feature flags ─────────────────────────────────────────────────────────

/**
 * Show the cookie consent banner. Turn this on when Google Analytics (or any
 * non-essential cookies) is added. Until then it's hidden — the site only uses
 * technical cookies, which don't require consent.
 *
 * Can be overridden at build time with NEXT_PUBLIC_SHOW_COOKIE_BANNER=true.
 */
// TODO: update when the Google Analytics is added
export const SHOW_COOKIE_BANNER =
  process.env.NEXT_PUBLIC_SHOW_COOKIE_BANNER === "true" ? true : false;
