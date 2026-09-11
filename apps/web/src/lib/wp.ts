const WP_SITE_ID = '252990550';
const WP_API_URL = `https://public-api.wordpress.com/wp/v2/sites/${WP_SITE_ID}`;;

export interface WPPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
}

export interface WPNavItem {
  url: string;
  title: string;
}

export async function getBlogArchivePosts(): Promise<WPPost[]> {
  const res = await fetch(`${WP_API_URL}/posts?categories=4526&per_page=100&_embed`);
  
  if (!res.ok) {
    throw new Error(`Failed to fetch blog archive posts: ${res.statusText}`);
  }
  return res.json();
}

export async function getWPPosts(): Promise<WPPost[]> {
  const res = await fetch(`${WP_API_URL}/posts?per_page=100&_embed`);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }
  return res.json();
}

export async function getWPPages(): Promise<WPPost[]> {
  const res = await fetch(`${WP_API_URL}/pages?_embed`);
  if (!res.ok) {
    throw new Error(`Failed to fetch pages: ${res.statusText}`);
  }
  return res.json();
}

export async function getSingleWPPost(slug: string): Promise<WPPost | null> {
  const res = await fetch(`${WP_API_URL}/posts?slug=${slug}`);
  const posts = await res.json();
  return posts[0] || null;
}

export async function getSingleWPPage(slug: string): Promise<WPPost | null> {
  const res = await fetch(`${WP_API_URL}/pages?slug=${slug}`);
  if (!res.ok) return null;
  const pages = await res.json();
  return pages[0] || null;
}

export async function getWPMenu(): Promise<WPNavItem[]> {
  try {
    const res = await fetch(`${WP_API_URL}/navigation`);

    if (!res.ok) {
      console.error(`[WP Navigation Error] Status: ${res.status} ${res.statusText}`);
      return [];
    }

    const navMenus = await res.json();

    if (!Array.isArray(navMenus) || navMenus.length === 0) {
      return [];
    }

    // Target the first navigation menu returned
    const primaryMenu = navMenus[0];
    const content = primaryMenu.content?.rendered || primaryMenu.content?.raw || "";

    // Parse block navigation links or raw HTML links
    const menuItems: WPNavItem[] = [];
    const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/g;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      menuItems.push({
        url: match[1],
        title: match[2].replace(/<[^>]*>/g, "").trim(), // Strip nested tags
      });
    }

    return menuItems;
  } catch (error) {
    console.error("[WP Navigation Fetch Failed]:", error);
    return [];
  }
}