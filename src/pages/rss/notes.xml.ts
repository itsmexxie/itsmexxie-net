import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { PublishedNote } from "../../types";

async function getPublishedNotes(): Promise<PublishedNote[]> {
  return (await getCollection("notes")).filter(
    (p) => p.data.dates,
  ) as PublishedNote[];
}

export const GET = (async (context) => {
  const notes = (await getPublishedNotes()).sort((a, b) => {
    const getLastDate = (note: PublishedNote) => {
      return (note.data.dates.edited ?? note.data.dates.publish).getTime();
    };

    return getLastDate(b) - getLastDate(a);
  });

  return rss({
    title: "itsmexxie's school notes",
    description:
      "Pokud v poznámkách narazíte na jakékoliv nesrovnalosti, napište prosím na site+notes@itsmexxie.net",
    site: context.site ?? "https://itsmexxie.net",
    items: notes.map((n) => ({
      title: n.data.title,
      description: n.data.description ?? "No description provided",
      pubDate: new Date(n.data.dates.publish),
      link: `/notes/post/${n.id}/`,
    })),
  });
}) satisfies APIRoute;
