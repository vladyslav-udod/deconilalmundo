import type { InstagramPost } from '@/components/InstagramFeed'

const HANDLE = 'deconilalmundo'
const PROFILE = `https://www.instagram.com/${HANDLE}/`

// Instagram's public web-profile endpoint. It is the most reliable no-auth
// source, but Instagram rate-limits / blocks many server IPs — so every call
// is wrapped in try/catch and the section falls back to curated imagery.
const WEB_PROFILE = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${HANDLE}`

interface IgEdgeNode {
  display_url?: string
  thumbnail_src?: string
  shortcode?: string
  accessibility_caption?: string
  edge_media_to_caption?: { edges?: { node?: { text?: string } }[] }
}

/**
 * Fetch the latest public Instagram posts for @deconilalmundo.
 * Returns up to `limit` posts, or null when Instagram can't be reached so the
 * caller can fall back to its curated grid.
 */
export async function getInstagramPosts(limit = 6): Promise<InstagramPost[] | null> {
  try {
    const res = await fetch(WEB_PROFILE, {
      headers: {
        // Instagram requires a browser-like UA + its public app id.
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        'X-IG-App-ID': '936619743392459',
        Accept: '*/*',
      },
      // Cache for 1 hour; Instagram content does not change minute-to-minute.
      next: { revalidate: 3600 },
    })

    if (!res.ok) return null

    const json = await res.json()
    const edges: { node?: IgEdgeNode }[] =
      json?.data?.user?.edge_owner_to_timeline_media?.edges ?? []

    const posts: InstagramPost[] = edges
      .slice(0, limit)
      .map(({ node }) => {
        const caption = node?.edge_media_to_caption?.edges?.[0]?.node?.text
        return {
          image: node?.display_url ?? node?.thumbnail_src ?? '',
          href: node?.shortcode ? `https://www.instagram.com/p/${node.shortcode}/` : PROFILE,
          alt: node?.accessibility_caption ?? caption ?? 'Publicación de Instagram',
        }
      })
      .filter((p) => p.image)

    return posts.length > 0 ? posts : null
  } catch {
    return null
  }
}
