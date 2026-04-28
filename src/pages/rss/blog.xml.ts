import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { PublishedPost } from "../../types";

async function getPublishedPosts(): Promise<PublishedPost[]> {
  return (await getCollection("blog")).filter(
    (p) => p.data.dates,
  ) as PublishedPost[];
}

export const GET = (async (context) => {
  const posts = (await getPublishedPosts()).sort((a, b) => {
    const getLastDate = (post: PublishedPost) => {
      return (post.data.dates.edited ?? post.data.dates.publish).getTime();
    };

    return getLastDate(b) - getLastDate(a);
  });

  return rss({
    title: "itsmexxie's blog",
    description: "collection of thoughts, opinions and ideas",
    site: context.site ?? "https://itsmexxie.net",
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description ?? "No description provided",
      pubDate: new Date(p.data.dates.publish),
      link: `/blog/post/${p.id}/`,
    })),
  });
}) satisfies APIRoute;
